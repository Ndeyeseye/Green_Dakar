import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

{
  path: 'citoyen/tabs',
    loadComponent: () => import('./citoyen/tabs/tabs.page').then(m => m.TabsPage),
    children: [
  {
    path: 'accueil',
    loadComponent: () => import('./citoyen/accueil/accueil.page').then( m => m.AccueilPage)
  },
  {
    path: 'signalement',
    loadComponent: () => import('./citoyen/signalement/signalement.page').then( m => m.SignalementPage)
  },
  {
    path: 'carte',
    loadComponent: () => import('./citoyen/carte/carte.page').then( m => m.CartePage)
  },
  {
    path: 'profil',
    loadComponent: () => import('./citoyen/profil/profil.page').then( m => m.ProfilPage)
  },
  {
    path: 'evenements',
    loadComponent: () => import('./citoyen/evenements/evenements.page').then( m => m.EvenementsPage)
  },
]
},

  {
    path: 'ONG/accueil',
    loadComponent: () => import('./ong/accueil/accueil.page').then( m => m.AccueilPage)
  },

{
  path: 'mairie/tabs',
    loadComponent: () => import('./mairie/tabs/tabs.page').then(m => m.TabsPage),
    children: [
  {
    path: 'accueil',
    loadComponent: () => import('./mairie/accueil/accueil.page').then( m => m.AccueilPage)
  },
  {
    path: 'intervention',
    loadComponent: () => import('./mairie/intervention/intervention.page').then( m => m.InterventionPage)
  },
  {
    path: 'profil',
    loadComponent: () => import('./mairie/profil/profil.page').then( m => m.ProfilPage)
  },
]
},

];
