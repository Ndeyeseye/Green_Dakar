import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonLabel,
  IonList,
  IonButton,
  IonAvatar
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';
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
    IonInput,
    IonLabel,
    IonList,
    IonButton,
    IonAvatar
  ],
})
export class EditProfilePage implements OnInit {
  newName = '';
  currentEmail = '';
  userPhoto = 'assets/avatar-placeholder.jpg';
  selectedFile: File | null = null;

  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.newName = user.displayName || '';
      this.currentEmail = user.email || '';
      this.userPhoto = user.photoURL || 'assets/avatar-placeholder.jpg';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.userPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async save() {
    try {
      if (this.newName.trim()) {
        await this.authService.updateDisplayName(this.newName);
      }

      if (this.selectedFile) {
        const photoURL = await this.authService.uploadProfilePhoto(this.selectedFile);
        await this.authService.updateProfilePhoto(photoURL);
        this.userPhoto = photoURL;
      }

      this.showToast('Profil mis à jour avec succès.', 'success');
      this.router.navigateByUrl('/citoyen/tabs/profil');
    } catch (err) {
      console.error(err);
      this.showToast('Erreur lors de la mise à jour du profil.', 'danger');
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
