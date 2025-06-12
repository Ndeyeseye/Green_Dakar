import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonIcon,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonTabs,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.page.html',
  styleUrls: ['./rapports.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonAvatar,
    IonIcon,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonTabs,
    IonTabBar,
    IonTabButton
  ]
})
export class RapportsPage implements OnInit {

  rapports = [
    {
      titre: "Rapport d’inspection",
      date: "Il y a 2 jours",
      auteur: "Jean Dupont"
    },
    {
      titre: "État de propreté",
      date: "Il y a 5 jours",
      auteur: "Jean Dupont"
    },
    {
      titre: "Incidents constatés",
      date: "Il y a 1 semaine",
      auteur: "Jean Dupont"
    },
    {
      titre: "Rapport final",
      date: "Il y a 2 semaines",
      auteur: "Jean Dupont"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
