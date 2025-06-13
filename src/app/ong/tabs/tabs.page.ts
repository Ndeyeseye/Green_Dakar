import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
}from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
   CommonModule, FormsModule, IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
  ]
})
export class TabsPage implements OnInit {
    activeTab = 'accueil';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects.split('/').pop();
        if (path) {
          this.activeTab = path;
        }
      }
    });
  }

  ngOnInit() {
  }

}
