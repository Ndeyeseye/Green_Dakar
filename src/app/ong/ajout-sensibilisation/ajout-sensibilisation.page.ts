import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ajout-sensibilisation',
  templateUrl: './ajout-sensibilisation.page.html',
  styleUrls: ['./ajout-sensibilisation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  ]
})
export class AjoutSensibilisationPage implements OnInit {

  form = {
    title: '',
    type: '',
    description: ''
  };

  fichier: File | null = null;

  constructor() {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fichier = file ?? null;
  }

  submitForm() {
    console.log('Titre :', this.form.title);
    console.log('Type :', this.form.type);
    console.log('Description :', this.form.description);
    console.log('Fichier :', this.fichier?.name || 'Aucun fichier sélectionné');

    // À implémenter : appel au service pour enregistrer les données et uploader le fichier
  }
}
