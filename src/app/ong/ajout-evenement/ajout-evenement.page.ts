import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, EventData } from 'src/app/services/event.service';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel,
  IonButton, IonDatetime, IonTextarea, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajout-evenement',
  templateUrl: './ajout-evenement.page.html',
  styleUrls: ['./ajout-evenement.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonInput, IonLabel, IonButton, IonDatetime, IonTextarea,
    IonButtons, IonBackButton
  ]
})
export class AjoutEvenementPage {
  event: EventData = {
    title: '',
    location: '',
    date: '',
    description: '',
    participants: 0,
  };

  constructor(
    private eventService: EventService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async submit() {
    if (!this.event.title || !this.event.location || !this.event.date) {
      this.presentToast('Veuillez remplir les champs obligatoires.', 'danger');
      return;
    }

    try {
      await this.eventService.addEvent(this.event);
      this.presentToast('Événement ajouté avec succès.', 'success');
      this.router.navigateByUrl('/ong/tabs/evenements');
    } catch (err) {
      console.error(err);
      this.presentToast('Erreur lors de l\'ajout de l\'événement.', 'danger');
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
