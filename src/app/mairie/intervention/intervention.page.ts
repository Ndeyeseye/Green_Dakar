import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData,addDoc,  serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonButton,
  IonList,
  ToastController,
  NavController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.page.html',
  styleUrls: ['./intervention.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonTitle,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton,
    IonList
  ]
})
export class InterventionPage {
  intervention = {
    zone: '',
    type: '',
    date: '',
    partenaires: '',
    remarques: ''
  };

  zonesDisponibles$!: Observable<any[]>;

  constructor(
    private firestore: Firestore,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    const ref = collection(this.firestore, 'signalements');
    this.zonesDisponibles$ = collectionData(collection(this.firestore, 'signalements'), { idField: 'id' });

  }



async validerIntervention() {
  if (!this.intervention.zone || !this.intervention.type || !this.intervention.date) {
    const toast = await this.toastController.create({
      message: 'Veuillez remplir tous les champs obligatoires.',
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
    return;
  }

  try {
    // 1️⃣ Conversion de la date choisie
    const dateChoisie = new Date(this.intervention.date);

    // 2️⃣ Construction du payload
    const dataToSave: any = {
      zone: this.intervention.zone,
      type: this.intervention.type,
      date: dateChoisie,             // ⬅️ ici la date de l’utilisateur
      partenaires: this.intervention.partenaires,
      remarques: this.intervention.remarques,
      createdAt: serverTimestamp()   // ⬅️ horodatage serveur (optionnel)
    };

    // 3️⃣ Enregistrement
    const interventionsRef = collection(this.firestore, 'interventions');
    await addDoc(interventionsRef, dataToSave);

    // 4️⃣ Confirmation à l’utilisateur
    const toast = await this.toastController.create({
      message: 'Intervention planifiée avec succès.',
      duration: 3000,
      color: 'success'
    });
    await toast.present();

    this.navCtrl.navigateBack('/dashboard');
  }
  catch (error) {
    console.error('Erreur Firebase :', error);
    const toast = await this.toastController.create({
      message: 'Erreur lors de l’enregistrement.',
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
  }
}}
