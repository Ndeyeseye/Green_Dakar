// import { Injectable, inject } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   addDoc,
//   serverTimestamp,
//   query,
//   where,
//   getDocs,
//   CollectionReference,
//   DocumentData
// } from '@angular/fire/firestore';
// import {
//   Storage,
//   ref,
//   uploadBytes,
//   getDownloadURL
// } from '@angular/fire/storage';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignalementService {
//   private firestore = inject(Firestore);
//   private storage = inject(Storage);

//   private signalementsCollection: CollectionReference<DocumentData> = collection(this.firestore, 'signalements');

//   // 📷 Upload de la photo dans Firebase Storage
//   async uploadPhoto(file: Blob): Promise<string> {
//     const filePath = `photos-signalements/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
//     const storageRef = ref(this.storage, filePath);

//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);
//     return downloadURL;
//   }

//   // ➕ Ajouter un signalement
//   async ajouterSignalement(signalement: {
//     uid: string;
//     localisation: string;
//     typeNuisance: string;
//     description: string;
//     photoFile?: File;
//   }) {
//     try {
//       let photoURL = '';

//       if (signalement.photoFile) {
//         photoURL = await this.uploadPhoto(signalement.photoFile);
//       }

//       await addDoc(this.signalementsCollection, {
//         uid: signalement.uid,
//         localisation: signalement.localisation,
//         typeNuisance: signalement.typeNuisance,
//         description: signalement.description,
//         photoURL: photoURL || null,
//         date: serverTimestamp()
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   // 🔍 Récupérer les signalements d'un utilisateur connecté
//   async getSignalementsByUser(uid: string): Promise<any[]> {
//     const q = query(this.signalementsCollection, where('uid', '==', uid));
//     const querySnapshot = await getDocs(q);

//     return querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   }
// }
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

  async uploadPhoto(file: Blob): Promise<string> {
    const filePath = `photos-signalements/${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async ajouterSignalement(signalement: {
    uid: string;
    localisation: string;
    typeNuisance: string;
    description: string;
    photoFile?: File;
  }) {
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
  }

  async getSignalementsByUser(uid: string): Promise<any[]> {
    const q = query(this.signalementsCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getAllSignalements(): Promise<any[]> {
    const snapshot = await getDocs(this.signalementsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getScoresParZone(): Promise<{ nom: string, score: number, niveau: string }[]> {
    const snapshot = await getDocs(this.signalementsCollection);
    const zoneMap = new Map<string, any[]>();
    const now = new Date();

    // 1. Regrouper par localisation
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const zone = data['localisation'] || 'Inconnu';
      if (!zoneMap.has(zone)) zoneMap.set(zone, []);
      zoneMap.get(zone)?.push(data);
    });

    const poids = {
      gravite: 0.4,
      volume: 0.3,
      anciennete: 0.2,
      type: 0.1
    };

    const zones: { nom: string, score: number, niveau: string }[] = [];

    for (const [zone, signalements] of zoneMap.entries()) {
      const volume = signalements.length;
      let totalGravite = 0, totalAnciennete = 0, totalType = 0;

      for (const sig of signalements) {
        const date = sig.date?.toDate?.() ?? now;
        const daysOld = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

        let gravite = 1;
        const type = sig.typeNuisance?.toLowerCase() || '';
        if (type.includes('décharge')) gravite = 5;
        else if (type.includes('eau')) gravite = 4;
        else if (type.includes('odeur')) gravite = 3;

        totalGravite += gravite;
        totalAnciennete += Math.min(daysOld, 30);
        totalType += gravite;
      }

      const graviteScore = 100 - (totalGravite / volume) * 20;
      const volumeScore = 100 - volume * 5;
      const ancienneteScore = 100 - (totalAnciennete / volume);
      const typeScore = 100 - (totalType / volume) * 10;

      const finalScore = Math.max(0,
        graviteScore * poids.gravite +
        volumeScore * poids.volume +
        ancienneteScore * poids.anciennete +
        typeScore * poids.type
      );

      zones.push({
        nom: zone,
        score: Math.round(finalScore),
        niveau: this.getNiveau(finalScore)
      });
    }

    return zones;
  }

  private getNiveau(score: number): string {
    if (score >= 80) return 'Faible';
    if (score >= 60) return 'Modéré';
    if (score >= 40) return 'Élevé';
    return 'Critique';
  }
}
