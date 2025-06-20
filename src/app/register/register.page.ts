import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Essentiel pour ngModel
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
  IonButton
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
    FormsModule, // ✅ Ajoute ceci
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async register() {
    if (this.password !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await this.authService.registerCitoyen(this.email, this.password, this.fullName);
      this.router.navigateByUrl('login');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription.");
    }
  }
}
