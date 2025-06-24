import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonIcon, IonLabel, IonList, IonListHeader, IonItem
} from '@ionic/angular/standalone';
import { SignalementService } from '../../services/signalement.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
    IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonIcon, IonLabel, IonList, IonListHeader, IonItem
  ]
})
export class ScorePage implements OnInit {

  score: number = 0;
  niveau: string = '';
  dateMiseAJour: string = '';
  zones: Array<{ nom: string, score: number, niveau: string }> = [];

  constructor(private signalementService: SignalementService) {}

  async ngOnInit() {
    this.dateMiseAJour = this.formatDate(new Date());

    const scores = await this.signalementService.getScoresParZone();
    this.zones = scores;

    if (scores.length > 0) {
      const moyenne = scores.reduce((acc, z) => acc + z.score, 0) / scores.length;
      this.score = Math.round(moyenne);
      this.niveau = this.getNiveau(this.score);
    } else {
      this.score = 0;
      this.niveau = 'Aucun signalement';
    }
  }

  getNiveau(score: number): string {
    if (score >= 80) return 'Faible';
    if (score >= 60) return 'Modéré';
    if (score >= 40) return 'Élevé';
    return 'Critique';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
