import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ➕ Import ajouté

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // ✅ Permet l'utilisation de [routerLink]
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
  ]
})
export class AccueilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
