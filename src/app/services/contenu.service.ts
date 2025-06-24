import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ContenuService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private contenusRef = collection(this.firestore, 'contenus');

  async uploadFichier(file: File): Promise<string> {
    const path = `contenus/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }

  async ajouterContenu(data: any) {
    return await addDoc(this.contenusRef, {
      ...data,
      createdAt: serverTimestamp()
    });
  }
}
