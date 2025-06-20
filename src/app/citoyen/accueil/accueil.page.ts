import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importation des composants Ionic
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
  IonBadge
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  notifications,
  leaf,
  warning,
  map,
  camera,
  home,
  addCircle,
  person
} from 'ionicons/icons';

// Firebase Auth
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { SignalementService } from '../../services/signalement.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
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
  ]
})
export class AccueilPage implements OnInit {
  nombreSignalements: number = 0;

  constructor(
    private signalementService: SignalementService,
    private auth: Auth
  ) {
    addIcons({
      notifications,
      leaf,
      warning,
      map,
      camera,
      home,
      addCircle,
      person
    });
  }

  ngOnInit(): void {
    // Attendre que Firebase Auth ait fini de charger l'utilisateur
    onAuthStateChanged(this.auth, async (user) => {
      if (user?.uid) {
        const signalements = await this.signalementService.getSignalementsByUser(user.uid);
        this.nombreSignalements = signalements.length;
      }
    });
  }
}
