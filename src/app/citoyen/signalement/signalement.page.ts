import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton,
  IonIcon, IonTextarea, IonSelect, IonCard,
  IonSelectOption, IonCardContent, IonButtons,
  IonBackButton, ToastController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, send, location, warning, documentText, images, create } from 'ionicons/icons';

import { SignalementService } from '../../services/signalement.service';
import { Auth } from '@angular/fire/auth';

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
  private auth = inject(Auth);

  localisation: string = 'Chargement...';
  typeNuisance: string = '';
  description: string = '';
  photoFile?: File;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  constructor(private toastController: ToastController) {
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
      const toast = await this.toastController.create({
        message: 'Veuillez remplir tous les champs obligatoires',
        duration: 3000,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      const toast = await this.toastController.create({
        message: 'Utilisateur non connecté',
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    try {
      await this.signalementService.ajouterSignalement({
        uid,
        localisation: this.localisation,
        typeNuisance: this.typeNuisance,
        description: this.description,
        photoFile: this.photoFile,
      });

      const toast = await this.toastController.create({
        message: 'Signalement envoyé avec succès ✅',
        duration: 3000,
        color: 'success',
      });
      await toast.present();

      // Réinitialisation du formulaire
      this.typeNuisance = '';
      this.description = '';
      this.photoFile = undefined;
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }

    } catch (error) {
      const toast = await this.toastController.create({
        message: `Erreur : ${error}`,
        duration: 3000,
        color: 'danger',
      });
      await toast.present();
    }
  }
}
