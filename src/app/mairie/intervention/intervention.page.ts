import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonButton,
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
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton
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

  zonesDisponibles = [
    { id: 1, nom: 'Zone A - Médina' },
    { id: 2, nom: 'Zone B - Parcelles Assainies' },
    { id: 3, nom: 'Zone C - Pikine' }
  ];

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

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

    console.log('✅ Intervention enregistrée :', this.intervention);

    const toast = await this.toastController.create({
      message: 'Intervention planifiée avec succès.',
      duration: 3000,
      color: 'success'
    });
    await toast.present();

    this.navCtrl.navigateBack('/dashboard');
  }
}
