import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  IonImg
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { Auth, signInAnonymously } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonInput,
    IonButton,
    IonImg
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // Connexion classique (email + mot de passe)
  login() {
    this.authService.login(this.email, this.password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        const role = await this.authService.getUserRole(uid);

        this.redirectUserByRole(role);
      })
      .catch(error => {
        console.error('❌ Erreur de connexion :', error.message);
        alert('Email ou mot de passe incorrect.');
      });
  }

  // Connexion anonyme + ajout du rôle "visiteur" dans Firestore
  loginAnonyme() {
    signInAnonymously(this.auth)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;

        // Crée le document Firestore pour l'utilisateur anonyme
        await setDoc(doc(this.firestore, `users/${uid}`), {
          role: 'citoyen',
          createdAt: new Date()
        });

        console.log('✅ Connexion anonyme réussie, redirection...');
        this.redirectUserByRole('visiteur');
      })
      .catch((error) => {
        console.error('❌ Erreur de connexion anonyme :', error.message);
        alert("La connexion anonyme a échoué.");
      });
  }

  // Rediriger l'utilisateur selon son rôle
  redirectUserByRole(role: string | null) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'mairie':
        this.router.navigate(['/mairie/tabs/accueil']);
        break;
      case 'citoyen':
        this.router.navigate(['/citoyen/tabs/accueil']);
        break;
      case 'ONG':
        this.router.navigate(['/ong/tabs/accueil']);
        break;
      case 'visiteur':
        this.router.navigate(['/citoyen/tabs/accueil']); // ou une page en lecture seule
        break;
      default:
        alert('Rôle inconnu ou non défini dans Firestore.');
    }
  }
}
