import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton,
  IonIcon, IonTextarea, IonSelect, IonCard,
  IonSelectOption, IonCardContent, IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, send, location, warning, documentText, images, create } from 'ionicons/icons';

import { SignalementService } from '../../services/signalement.service'; // adapte le chemin si besoin

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.page.html',
  styleUrls: ['./signalement.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonTextarea,
    IonSelect,
    IonCard,
    IonSelectOption,
    IonCardContent,
    IonButtons,
    IonBackButton,
  ],
})
export class SignalementPage {
  // Injection manuelle du service (avec inject) car standalone
  private signalementService = inject(SignalementService);

  // Formulaire
  localisation: string = '123 rue Principale, Dakar';
  typeNuisance: string = '';
  description: string = '';
  photoFile?: File;

  // Pour gérer input file caché
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  constructor() {
    addIcons({
      camera,
      send,
      location,
      warning,
      documentText,
      images,
      create,
    });
  }
modifierLocalisation() {
  console.log('Modifier localisation appelée');
  // Plus tard tu pourras ajouter la vraie logique
}

  ouvrirSelecteurPhoto() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      console.log('Photo sélectionnée :', this.photoFile.name);
    }
  }

  async submitReport() {
    if (!this.typeNuisance || !this.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await this.signalementService.ajouterSignalement({
        localisation: this.localisation,
        typeNuisance: this.typeNuisance,
        description: this.description,
        photoFile: this.photoFile,
      });
      alert('Signalement envoyé avec succès');
      // Reset formulaire
      this.typeNuisance = '';
      this.description = '';
      this.photoFile = undefined;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi du signalement : ' + error);
    }
  }
}
