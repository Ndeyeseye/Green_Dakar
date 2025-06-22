import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonList,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonList,
    IonItem,
    IonIcon,
    IonInput,
    IonButton
  ]
})
export class RegisterPage implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async register() {
    // Vérification de champs vides
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.showToast('Veuillez remplir tous les champs.', 'danger');
      return;
    }

    // Vérifie le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showToast("Format d'email invalide.", 'danger');
      return;
    }

    // Vérifie si les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.showToast('Les mots de passe ne correspondent pas.', 'danger');
      return;
    }

    try {
      await this.authService.registerCitoyen(this.email, this.password, this.fullName);
      this.showToast('Inscription réussie !', 'success');
      this.router.navigateByUrl('/login');
    } catch (err: any) {
      console.error('Erreur Firebase:', err.code);

      if (err.code === 'auth/email-already-in-use') {
        this.showToast('Cet email est déjà utilisé.', 'danger');
      } else if (err.code === 'auth/invalid-email') {
        this.showToast("L'email est invalide ou n'existe pas.", 'danger');
      } else if (err.code === 'auth/weak-password') {
        this.showToast('Mot de passe trop faible (min. 6 caractères).', 'danger');
      } else {
        this.showToast("Une erreur s'est produite. Veuillez réessayer.", 'danger');
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      color
    });
    await toast.present();
  }
}
