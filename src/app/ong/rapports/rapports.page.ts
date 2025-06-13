import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic Standalone Components
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.page.html',
  styleUrls: ['./rapports.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Ionic components utilisés dans le HTML
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonChip
  ],
})
export class RapportsPage implements OnInit {

  constructor() { }

  ngOnInit() {}

  downloadReport() {
    console.log('Téléchargement du rapport principal...');
  }

  downloadSpecificReport(reportName: string) {
    console.log(`Téléchargement du rapport : ${reportName}`);
  }

}
