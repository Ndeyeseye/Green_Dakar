import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonChip
  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contenus',
  templateUrl: './contenus.page.html',
  styleUrls: ['./contenus.page.scss'],
  standalone: true,
  imports: [IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonChip
  ]
})
export class ContenusPage implements OnInit {

  contents = [
    { title: 'Lutter contre les déchets plastiques', type: 'Article', date: '10 Juin', icon: 'document-text', color: 'success' },
    { title: 'Vidéo - Nettoyage des plages', type: 'Vidéo', date: '08 Juin', icon: 'videocam', color: 'success' },
    { title: 'Affiche - Trier ses déchets', type: 'Visuel', date: '05 Juin', icon: 'image', color: 'success' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
