import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ RouterModule ici
import { EventService, EventData } from 'src/app/services/event.service';

// ✅ Ionic Standalone Components
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.page.html',
  styleUrls: ['./evenements.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    RouterModule, // ✅ Ajouté ici pour routerLink
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonNote,
    IonChip,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  ]
})
export class EvenementsPage implements OnInit {
  upcomingEvents: EventData[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.upcomingEvents = await this.eventService.getEvents();
    } catch (error) {
      console.error('Erreur lors du chargement des événements :', error);
    }
  }

  onEventClick(event: EventData) {
    console.log('Événement sélectionné :', event);
  }

  goToAddEvent() {
    this.router.navigateByUrl('/ong/ajout-evenement');
  }

  goToAddSensibilisation() {
    this.router.navigateByUrl('/ong/tabs/contenus');
  }
}
