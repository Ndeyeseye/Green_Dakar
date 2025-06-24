import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference, doc, getDoc, updateDoc } from '@angular/fire/firestore';

export interface EventData {
  id?: string;
  title: string;
  location: string;
  date: string;
  description?: string;
  participants?: number;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.eventsCollection = collection(this.firestore, 'evenements');
  }

  async addEvent(event: EventData): Promise<void> {
    await addDoc(this.eventsCollection, {
      ...event,
      createdAt: new Date()
    });
  }

  async getEvents(): Promise<EventData[]> {
  const snapshot = await getDocs(this.eventsCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,  
    ...doc.data() as EventData
  }));
}

  async getEventById(id: string): Promise<any> {
  const ref = doc(this.firestore, `evenements/${id}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

async updateEvent(id: string, data: any): Promise<void> {
  const ref = doc(this.firestore, `evenements/${id}`);
  await updateDoc(ref, data);
}

}
