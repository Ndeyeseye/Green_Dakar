import { Component } from '@angular/core';
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
  IonBadge,
  IonTabs,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';

// Importation des icônes
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';

// Dans le constructor
addIcons({ calendar });
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

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    // Modules Angular
    CommonModule,
    FormsModule,
    RouterModule,

    // Composants Ionic
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
    // IonTabs,
    // IonTabBar,
    // IonTabButton
  ]
})
export class AccueilPage {
  constructor() {
    // Ajout des icônes utilisées
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

}
