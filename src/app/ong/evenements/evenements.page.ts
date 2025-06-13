import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic Standalone Components utilisés dans ton HTML
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.page.html',
  styleUrls: ['./evenements.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
    IonChip,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class EvenementsPage implements OnInit {
  upcomingEvents = [
    {
      date: '15 Juin',
      title: 'Nettoyage plage de Yoff',
      location: 'Plage de Yoff, Dakar',
      participants: 45,
    },
    {
      date: '22 Juin',
      title: 'Reboisement communautaire',
      location: 'Forêt de Mbao',
      participants: 32,
    },
    {
      date: '29 Juin',
      title: 'Collecte de déchets électroniques',
      location: 'Place de l’Indépendance',
      participants: 50,
    },
  ];

  constructor() {}

  ngOnInit() {}

  onEventClick(event: any) {
    console.log('Événement sélectionné :', event);
  }
}
