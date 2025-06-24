import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonList
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-mairie',
  templateUrl: './register-mairie.page.html',
  styleUrls: ['./register-mairie.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonList
  ]
})
export class RegisterMairiePage implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async registerMairie() {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
  await this.authService.registerMairie(this.email, this.password, this.fullName);
  alert('Compte Mairie créé avec succès !');
  this.router.navigateByUrl('/login');
} catch (error: any) {
  if (error.code === 'auth/email-already-in-use') {
    alert("Cet email est déjà utilisé. Veuillez en choisir un autre.");
  } else {
    console.error('Erreur complète :', error);
    alert("Erreur lors de l'inscription.");
  }
}

  }
}
