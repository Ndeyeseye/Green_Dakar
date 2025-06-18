import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonChip,
  IonButton,
  IonThumbnail,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signalements',
  templateUrl: './signalements.page.html',
  styleUrls: ['./signalements.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonChip,
    IonButton,
    IonThumbnail,
    IonImg
  ]
})
export class SignalementsPage implements OnInit {

  signalements = [
    {
      typeNuisance: 'Décharge sauvage',
      localisation: 'Yoff',
      date: new Date('2024-06-12'),
      photoURL: 'https://via.placeholder.com/80'  // exemple d’image
    },
    {
      typeNuisance: 'Eaux usées',
      localisation: 'Pikine',
      date: new Date('2024-06-10'),
      photoURL: ''
    },
    {
      typeNuisance: 'Ordures ménagères',
      localisation: 'Guédiawaye',
      date: new Date('2024-06-08'),
      photoURL: 'https://via.placeholder.com/80'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
