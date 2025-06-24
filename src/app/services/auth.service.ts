// src/app/services/auth.service.ts

import { Injectable, inject } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signOut, UserCredential, createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { onAuthStateChanged, User } from '@angular/fire/auth';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storage = inject(Storage);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    //private storage: Storage
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

  async getCurrentUser() {
  return this.auth.currentUser;
}

getCurrentUserRealtime(): Promise<User | null> {
  return new Promise(resolve => {
    onAuthStateChanged(this.auth, user => {
      resolve(user);
    });
  });
}

async updateDisplayName(name: string): Promise<void> {
  const user = this.auth.currentUser;
  if (user) {
    const u = await user;
    await updateProfile(u, { displayName: name });

    const userRef = doc(this.firestore, `users/${u.uid}`);
    await setDoc(userRef, { fullName: name }, { merge: true });
  }
}

async updateEmailUser(newEmail: string): Promise<void> {
    const user = await this.auth.currentUser;
    if (user && newEmail !== user.email) {
      await updateEmail(user, newEmail);
    }
}

async updatePassword(newPassword: string): Promise<void> {
  const user = this.auth.currentUser;
  if (user) {
    const u = await user;
    return updatePassword(u, newPassword);
  }
}

// Upload vers Firebase Storage
async uploadProfilePhoto(file: File): Promise<string> {
  const path = `profile-photos/${Date.now()}_${file.name}`;
  const storageRef = ref(this.storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Mise à jour du profil Firebase Auth
async updateProfilePhoto(photoURL: string): Promise<void> {
  const user = await this.auth.currentUser;
  if (user) {
    await updateProfile(user, { photoURL });
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userRef, { photoURL }, { merge: true });
  }
}

async registerOng(email: string, password: string, fullName: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user = userCredential.user;

  // Mettre à jour le nom dans Firebase Auth
  await updateProfile(user, { displayName: fullName });

  // Enregistrer les données dans Firestore
  const userRef = doc(this.firestore, `users/${user.uid}`);
  await setDoc(userRef, {
    uid: user.uid,
    email,
    fullName,
    role: 'ong',
    createdAt: new Date()
  });
}


async registerMairie(email: string, password: string, fullName: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user = userCredential.user;

  // Mettre à jour le nom dans Firebase Auth
  await updateProfile(user, { displayName: fullName });

  // Enregistrer les données dans Firestore
  const userRef = doc(this.firestore, `users/${user.uid}`);
  await setDoc(userRef, {
    uid: user.uid,
    email,
    fullName,
    role: 'mairie',
    createdAt: new Date()
  });
}

}
