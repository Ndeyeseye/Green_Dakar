import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SignalementService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  private signalementsCollection: CollectionReference<DocumentData> = collection(this.firestore, 'signalements');

  // 📷 Upload de la photo dans Firebase Storage
  async uploadPhoto(file: Blob): Promise<string> {
    const filePath = `photos-signalements/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  // ➕ Ajouter un signalement
  async ajouterSignalement(signalement: {
    uid: string;
    localisation: string;
    typeNuisance: string;
    description: string;
    photoFile?: File;
  }) {
    try {
      let photoURL = '';

      if (signalement.photoFile) {
        photoURL = await this.uploadPhoto(signalement.photoFile);
      }

      await addDoc(this.signalementsCollection, {
        uid: signalement.uid,
        localisation: signalement.localisation,
        typeNuisance: signalement.typeNuisance,
        description: signalement.description,
        photoURL: photoURL || null,
        date: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }

  // 🔍 Récupérer les signalements d'un utilisateur connecté
  async getSignalementsByUser(uid: string): Promise<any[]> {
    const q = query(this.signalementsCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}
