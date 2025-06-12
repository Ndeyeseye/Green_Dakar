import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton 
} from '@ionic/angular/standalone';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ]
})
export class CartePage {
  // Coordonnées de Dakar
  center: google.maps.LatLngLiteral = { lat: 14.6928, lng: -17.4467 };
  zoom = 13;

  // Exemple de marqueurs à afficher
  markers = [
    {
      position: { lat: 14.7000, lng: -17.4500 },
      label: '🗑️ Décharge 1',
    },
    {
      position: { lat: 14.6900, lng: -17.4400 },
      label: '💧 Eaux usées',
    }
  ];
}