// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import {
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonButtons,
//   IonBackButton,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonList,
//   IonTextarea,
//   IonSelect,
//   IonSelectOption,
//   IonButton,
//   IonIcon
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-ajout-sensibilisation',
//   templateUrl: './ajout-sensibilisation.page.html',
//   styleUrls: ['./ajout-sensibilisation.page.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonContent,
//     IonHeader,
//     IonToolbar,
//     IonTitle,
//     IonButtons,
//     IonBackButton,
//     IonInput,
//     IonItem,
//     IonLabel,
//     IonList,
//     IonTextarea,
//     IonSelect,
//     IonSelectOption,
//     IonButton,
//     IonIcon
//   ]
// })
// export class AjoutSensibilisationPage implements OnInit {

//   form = {
//     title: '',
//     type: '',
//     description: ''
//   };

//   fichier: File | null = null;

//   constructor() {}

//   ngOnInit() {}

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     this.fichier = file ?? null;
//   }

//   submitForm() {
//     console.log('Titre :', this.form.title);
//     console.log('Type :', this.form.type);
//     console.log('Description :', this.form.description);
//     console.log('Fichier :', this.fichier?.name || 'Aucun fichier sélectionné');

//     // À implémenter : appel au service pour enregistrer les données et uploader le fichier
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContenuService } from '../../services/contenu.service'; // adapte le chemin selon ton arborescence
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

  constructor(private contenuService: ContenuService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fichier = file ?? null;
  }

  async submitForm() {
    try {
      let fileUrl = '';

      if (this.fichier) {
        fileUrl = await this.contenuService.uploadFichier(this.fichier);
      }

      const data = {
        ...this.form,
        fileUrl
      };

      await this.contenuService.ajouterContenu(data);

      console.log('✅ Contenu ajouté avec succès');
      this.resetForm();

    } catch (err) {
      console.error('❌ Erreur lors de la soumission du formulaire :', err);
    }
  }

  resetForm() {
    this.form = { title: '', type: '', description: '' };
    this.fichier = null;
  }
}
