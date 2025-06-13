import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonChip, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signalements',
  templateUrl: './signalements.page.html',
  styleUrls: ['./signalements.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonChip, IonButton

  ]
})
export class SignalementsPage implements OnInit {

  signalements = [
    { type: 'Décharge sauvage', date: '12 Juin', lieu: 'Yoff' },
    { type: 'Eaux usées', date: '10 Juin', lieu: 'Pikine' },
    { type: 'Ordures ménagères', date: '08 Juin', lieu: 'Guédiawaye' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
