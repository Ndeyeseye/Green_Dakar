import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
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

import { SignalementService } from '../../services/signalement.service';

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
export class SignalementPage implements OnInit {
  private signalementService = inject(SignalementService);

  localisation: string = 'Chargement...';
  typeNuisance: string = '';
  description: string = '';
  photoFile?: File;

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

  ngOnInit() {
    this.getLocalisationAutomatique();
  }

  getLocalisationAutomatique() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getAdresseDepuisCoordonnees(latitude, longitude);
        },
        (error) => {
          console.error('Erreur de localisation :', error);
          this.localisation = 'Localisation non disponible';
        }
      );
    } else {
      this.localisation = 'Géolocalisation non supportée';
    }
  }

  async getAdresseDepuisCoordonnees(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        this.localisation = data.display_name;
        console.log('Adresse obtenue :', this.localisation);
      } else {
        this.localisation = `Latitude : ${latitude}, Longitude : ${longitude}`;
        console.warn('Adresse non trouvée, coordonnées utilisées à la place.');
      }
    } catch (error) {
      console.error('Erreur de géocodage inverse :', error);
      this.localisation = `Latitude : ${latitude}, Longitude : ${longitude}`;
    }
  }

  modifierLocalisation() {
    console.log('Relancer la géolocalisation');
    this.getLocalisationAutomatique();
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

      // Réinitialiser les champs
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
