// accueil.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAvatar,
  IonNote
} from '@ionic/angular/standalone';

interface StatItem {
  number: string;
  label: string;
  color: string;
}

interface Event {
  date: string;
  title: string;
  location: string;
  participants: number;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    // IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonChip,
    IonAvatar,
    IonNote
  ]
})
export class AccueilPage implements OnInit {
  
  stats: StatItem[] = [
    { number: '247', label: 'Signalements ce mois', color: 'primary' },
    { number: '1,834', label: 'Total cette année', color: 'success' },
    { number: '89%', label: 'Taux de résolution', color: 'warning' },
    { number: '156', label: 'Bénévoles actifs', color: 'tertiary' }
  ];

  upcomingEvents: Event[] = [
    {
      date: '15 Juin 2025',
      title: 'Clean-up Day - Plage de Yoff',
      location: 'Dakar, Sénégal',
      participants: 45
    },
    {
      date: '22 Juin 2025',
      title: 'Sensibilisation Écoles',
      location: 'Lycée Kennedy',
      participants: 120
    },
    {
      date: '28 Juin 2025',
      title: 'Plantation d\'arbres',
      location: 'Parc Forestier de Hann',
      participants: 78
    }
  ];

  quickActions = [
    { icon: 'add-circle', title: 'Nouveau signalement', color: 'danger' },
    { icon: 'download', title: 'Télécharger rapport', color: 'primary' },
    { icon: 'people', title: 'Gérer bénévoles', color: 'success' },
    { icon: 'calendar', title: 'Organiser événement', color: 'warning' }
  ];

  constructor() { }

  ngOnInit() {
  }

  onStatClick(stat: StatItem) {
    console.log('Statistique cliquée:', stat);
  }

  onEventClick(event: Event) {
    console.log('Événement cliqué:', event);
  }

  onQuickActionClick(action: any) {
    console.log('Action rapide:', action);
  }

  downloadReport() {
    console.log('Téléchargement du rapport...');
  }

  viewAllSignalements() {
    console.log('Redirection vers tous les signalements');
  }
}