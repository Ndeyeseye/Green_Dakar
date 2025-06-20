import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
  ]
})
export class EditProfilePage implements OnInit {

  newName = '';
  currentEmail = '';

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.newName = user.displayName || '';
      this.currentEmail = user.email || '';
    }
  }

  async save() {
    if (!this.newName.trim()) {
      alert('Le nom ne peut pas être vide.');
      return;
    }

    try {
      // Mettre à jour l'email si modifié
      await this.authService.updateEmailUser(this.currentEmail);

      // Mettre à jour le nom complet
      await this.authService.updateDisplayName(this.newName);

      alert('Profil mis à jour avec succès');
      this.router.navigateByUrl('/citoyen/tabs/profil');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour.");
    }
  }
}
