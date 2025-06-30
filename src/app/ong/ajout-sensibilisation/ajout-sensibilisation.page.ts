import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ContenuService } from '../../services/contenu.service'; // adapte le chemin si nécessaire

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ajout-sensibilisation',
  templateUrl: './ajout-sensibilisation.page.html',
  styleUrls: ['./ajout-sensibilisation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  ]
})
export class AjoutSensibilisationPage implements OnInit {
  form = {
    title: '',
    type: '',
    description: ''
  };

  fichier: File | null = null;

  constructor(
    private contenuService: ContenuService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fichier = file ?? null;
  }

  async submitForm() {
    try {
      let fileUrl = '';

      if (this.fichier) {
        fileUrl = await this.contenuService.uploadFichier(this.fichier);
      }

      const data = {
        ...this.form,
        fileUrl
      };

      await this.contenuService.ajouterContenu(data);

      await this.presentToast('✅ Contenu ajouté avec succès !');
      this.resetForm();

    } catch (err) {
      console.error('Erreur lors de la soumission :', err);
      await this.presentToast('❌ Échec de l’enregistrement du contenu', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }

  resetForm() {
    this.form = { title: '', type: '', description: '' };
    this.fichier = null;
  }
}
