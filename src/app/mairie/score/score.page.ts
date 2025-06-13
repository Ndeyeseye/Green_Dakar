import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonLabel,
    IonList,
    IonListHeader,
    IonItem
  ]
})
export class ScorePage implements OnInit {

  score: number = 72;
  niveau: string = '';
  dateMiseAJour: string = '';
  zones = [
    { nom: 'Pikine', niveau: 'Insalubrité élevée' },
    { nom: 'Guédiawaye', niveau: 'Modérée' },
    { nom: 'Parcelles Assainies', niveau: 'Critique' }
  ];

  constructor() {}

  ngOnInit() {
    this.definirNiveau();
    this.dateMiseAJour = this.formatDate(new Date());
  }

  definirNiveau() {
    if (this.score >= 80) {
      this.niveau = 'Critique';
    } else if (this.score >= 60) {
      this.niveau = 'Élevé';
    } else if (this.score >= 40) {
      this.niveau = 'Modéré';
    } else {
      this.niveau = 'Faible';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
