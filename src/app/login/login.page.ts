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
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    
    IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
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

  constructor() {}

  login() {
    console.log('Connexion avec :', this.email, this.password);
    // 🔐 À connecter avec Firebase Auth
  }

  loginAnonyme() {
    console.log('Connexion anonyme');
    // 🔐 À connecter avec Firebase Auth anonyme
  }
}
