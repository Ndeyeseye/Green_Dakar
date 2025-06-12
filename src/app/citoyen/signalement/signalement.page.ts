import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, 
  IonIcon, IonTextarea, IonSelect, IonCard,
  IonSelectOption, IonCardContent, IonButtons,
  IonBackButton, IonNote
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, send, location, warning, documentText, images, create } from 'ionicons/icons';

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
    
  ]
})
export class SignalementPage {
  locationChecked = true;
  descriptionChecked = false;
  nuisanceChecked = false;

  constructor() {
    addIcons({ 
      camera, 
      send, 
      location, 
      warning, 
      documentText, 
      images, 
      create 
    });
  }

  submitReport() {
    console.log('Signalement envoyé');
  }
}