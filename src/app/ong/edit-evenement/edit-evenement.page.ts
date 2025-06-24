import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonButton, IonList
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-evenement',
  templateUrl: './edit-evenement.page.html',
  styleUrls: ['./edit-evenement.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList
  ]
})
export class EditEvenementPage implements OnInit {
  eventId = '';
  event: any = {
    title: '',
    date: '',
    location: ''
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')!;
    const data = await this.eventService.getEventById(this.eventId);
    if (data) this.event = data;
  }

  async save() {
    try {
      await this.eventService.updateEvent(this.eventId, this.event);
      alert('Événement mis à jour avec succès');
      this.router.navigateByUrl('/ong/tabs/evenements');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    }
  }
}
