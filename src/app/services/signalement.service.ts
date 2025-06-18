import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SignalementService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  private signalementsCollection = collection(this.firestore, 'signalements');

  // Fonction pour uploader la photo dans Storage et récupérer son URL
  async uploadPhoto(file: Blob): Promise<string> {
    const filePath = `photos-signalements/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  // Fonction pour ajouter un signalement avec photo (optionnelle)
  async ajouterSignalement(signalement: {
    localisation: string;
    typeNuisance: string;
    description: string;
    photoFile?: File;  // Fichier image optionnel
  }) {
    try {
      let photoURL = '';

      if (signalement.photoFile) {
        photoURL = await this.uploadPhoto(signalement.photoFile);
      }

      await addDoc(this.signalementsCollection, {
        localisation: signalement.localisation,
        typeNuisance: signalement.typeNuisance,
        description: signalement.description,
        photoURL,             // URL de la photo dans Storage (vide si pas de photo)
        date: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  }
}
