import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-evenements',
  standalone: true,
  templateUrl: './evenements.page.html',
  styleUrls: ['./evenements.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons
  ]
})
export class EvenementsPage implements OnInit {
  constructor() {}
  ngOnInit() {}
}
