// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Connexion
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Déconnexion
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Récupération du rôle à partir de l'UID
  async getUserRole(uid: string): Promise<string | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data['role'] || null;
    } else {
      return null;
    }
  }

  // ✅ Inscription du citoyen
  async registerCitoyen(email: string, password: string, fullName: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Met à jour le nom complet dans Firebase Auth
    await updateProfile(user, { displayName: fullName });

    // Sauvegarde les infos dans Firestore (dans une collection "citoyens")
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userRef, {
      uid: user.uid,
      email,
      fullName,
      role: 'citoyen',
      createdAt: new Date()
    });
  }
}
