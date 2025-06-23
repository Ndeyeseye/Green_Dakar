import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference } from '@angular/fire/firestore';

export interface EventData {
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
    return snapshot.docs.map(doc => doc.data() as EventData);
  }
}
