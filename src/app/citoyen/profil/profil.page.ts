import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar
  ]
})
export class ProfilPage implements OnInit {

  userName: string = '';
  userEmail: string = '';
  userPhoto: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  this.authService.getCurrentUserRealtime().then(user => {
    console.log('Utilisateur :', user);
    if (user) {
      this.userName = user.displayName || 'Nom inconnu';
      this.userEmail = user.email || 'Email non disponible';
      this.userPhoto = user.photoURL || 'assets/avatar-placeholder.jpg';
    }
  });
}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
