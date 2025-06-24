// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { 
//   IonContent, 
//   IonHeader, 
//   IonTitle, 
//   IonToolbar,
//   IonButtons,
//   IonBackButton 
// } from '@ionic/angular/standalone';
// import { GoogleMapsModule } from '@angular/google-maps';

// @Component({
//   selector: 'app-carte',
//   templateUrl: './carte.page.html',
//   styleUrls: ['./carte.page.scss'],
//   standalone: true,
//   imports: [
//     IonContent,
//     IonHeader,
//     IonToolbar,
//     IonTitle,
//     IonButtons,
//     IonBackButton,
//     CommonModule,
//     FormsModule,
//     GoogleMapsModule,
//   ]
// })
// export class CartePage {
//   // Coordonnées de Dakar
//   center: google.maps.LatLngLiteral = { lat: 14.6928, lng: -17.4467 };
//   zoom = 13;

//   // Exemple de marqueurs à afficher
//   markers = [
//     {
//       position: { lat: 14.7000, lng: -17.4500 },
//       label: '🗑️ Décharge 1',
//     },
//     {
//       position: { lat: 14.6900, lng: -17.4400 },
//       label: '💧 Eaux usées',
//     }
//   ];
// }
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { GoogleMapsModule } from '@angular/google-maps';
import { SignalementService } from '../../services/signalement.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton
  ]
})
export class CartePage implements OnInit {
  private signalementService = inject(SignalementService);

  center = { lat: 14.6928, lng: -17.4467 }; // Dakar
  zoom = 13;

  markers: Array<{ position: google.maps.LatLngLiteral; label: string; title?: string }> = [];

  async ngOnInit() {
    const signalements = await this.signalementService.getAllSignalements();
    this.markers = [];

    for (const sig of signalements) {
      if (sig.localisation) {
        const coords = await this.geocodeAdresse(sig.localisation);
        if (coords) {
          this.markers.push({
            position: coords,
            label: sig.typeNuisance || 'Signalement',
            title: sig.description || 'Aucun détail'
          });
        }
      }
    }
  }

  // Utilise OpenStreetMap Nominatim pour géocoder la localisation texte en coordonnées
  async geocodeAdresse(adresse: string): Promise<google.maps.LatLngLiteral | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adresse)}`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      if (results && results.length > 0) {
        return {
          lat: parseFloat(results[0].lat),
          lng: parseFloat(results[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur géocodage:', error);
      return null;
    }
  }
}
