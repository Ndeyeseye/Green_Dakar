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
  IonItem,
  IonLabel,
  IonInput,
  IonAvatar,
  IonButton
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
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
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonButton
  ]
})
export class EditProfilePage implements OnInit {
  newName: string = '';
  email: string = '';
  userPhoto: string = '';
  selectedFile?: File;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.newName = user.displayName || '';
      this.email = user.email || '';
      this.userPhoto = user.photoURL || 'assets/avatar-placeholder.jpg';
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async save() {
    try {
      if (this.selectedFile) {
        const photoURL = await this.authService.uploadProfilePhoto(this.selectedFile);
        await this.authService.updateProfilePhoto(photoURL);
        this.userPhoto = photoURL;
      }

      if (this.newName.trim()) {
        await this.authService.updateDisplayName(this.newName);
      }

      alert('Profil mis à jour avec succès.');
      this.router.navigateByUrl('/mairie/tabs/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert('Une erreur est survenue.');
    }
  }
}
