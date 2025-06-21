import { Component, OnInit } from '@angular/core';
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
  IonButton
} from '@ionic/angular/standalone';

import { LoadingController, ToastController } from '@ionic/angular';
import {
  Auth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
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
    IonButton
  ]
})
export class ChangePasswordPage implements OnInit {

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async changePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.presentToast('Veuillez remplir tous les champs.', 'danger');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.presentToast('Les mots de passe ne correspondent pas.', 'danger');
      return;
    }

    const user = await this.auth.currentUser;
    if (!user || !user.email) {
      this.presentToast('Utilisateur non authentifié.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Mise à jour...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, this.newPassword);

      await loading.dismiss();
      this.presentToast('Mot de passe mis à jour avec succès.', 'success');

      setTimeout(() => {
        this.router.navigateByUrl('/citoyen/tabs/profil');
      }, 1500);

    } catch (err: any) {
  await loading.dismiss();
  console.error('Erreur complète :', err); // 🔍 Voir le code exact ici

  if (err.code === 'auth/wrong-password') {
    this.presentToast('Mot de passe actuel incorrect.', 'danger');
  } else if (err.code === 'auth/too-many-requests') {
    this.presentToast('Trop de tentatives. Réessayez plus tard.', 'danger');
  } else {
    this.presentToast('Erreur lors de la mise à jour du mot de passe.', 'danger');
  }
}

  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
