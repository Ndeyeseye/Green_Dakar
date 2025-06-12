// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonButtons,
//   IonButton,
//   IonIcon,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonList,
//   IonItem,
//   IonLabel,
//   IonBadge
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-accueil',
//   templateUrl: './accueil.page.html',
//   styleUrls: ['./accueil.page.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonButtons,
//     IonButton,
//     IonIcon,
//     IonCard,
//     IonCardHeader,
//     IonCardTitle,
//     IonCardContent,
//     IonList,
//     IonItem,
//     IonLabel,
//     IonBadge
//   ]
// })
// export class AccueilPage implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    // IonTabs,
    // IonTabBar,
    // IonTabButton,
    // IonLabel,
   
  ]
})
export class AccueilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
