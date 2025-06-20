import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'citoyen/tabs',
    loadComponent: () => import('./citoyen/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'accueil',
        loadComponent: () => import('./citoyen/accueil/accueil.page').then(m => m.AccueilPage)
      },
      {
        path: 'signalement',
        loadComponent: () => import('./citoyen/signalement/signalement.page').then(m => m.SignalementPage)
      },
      {
        path: 'carte',
        loadComponent: () => import('./citoyen/carte/carte.page').then(m => m.CartePage)
      },
      {
        path: 'profil',
        loadComponent: () => import('./citoyen/profil/profil.page').then(m => m.ProfilPage)
      },
      {
        path: 'evenements',
        loadComponent: () => import('./citoyen/evenements/evenements.page').then(m => m.EvenementsPage)
      },
    ]
  },

  {
    path: 'mairie/tabs',
    loadComponent: () => import('./mairie/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'accueil',
        loadComponent: () => import('./mairie/accueil/accueil.page').then(m => m.AccueilPage)
      },
      {
        path: 'intervention',
        loadComponent: () => import('./mairie/intervention/intervention.page').then(m => m.InterventionPage)
      },
      {
        path: 'rapports',
        loadComponent: () => import('./mairie/rapports/rapports.page').then(m => m.RapportsPage)
      },
      {
        path: 'profil',
        loadComponent: () => import('./mairie/profil/profil.page').then(m => m.ProfilPage)
      },
      {
        path: 'carte',
        loadComponent: () => import('./mairie/carte/carte.page').then(m => m.CartePage)
      },
      {
        path: 'score',
        loadComponent: () => import('./mairie/score/score.page').then(m => m.ScorePage)
      },
    ]
  },

  {
    path: 'ong/tabs',
    loadComponent: () => import('./ong/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'signalements',
        loadComponent: () => import('./ong/signalements/signalements.page').then(m => m.SignalementsPage)
      },
      {
        path: 'rapports',
        loadComponent: () => import('./ong/rapports/rapports.page').then(m => m.RapportsPage)
      },
      {
        path: 'contenus',
        loadComponent: () => import('./ong/contenus/contenus.page').then(m => m.ContenusPage)
      },
      {
        path: 'evenements',
        loadComponent: () => import('./ong/evenements/evenements.page').then(m => m.EvenementsPage)
      },
      {
        path: 'accueil',
        loadComponent: () => import('./ong/accueil/accueil.page').then(m => m.AccueilPage)
      },
      {
        path: 'profil',
        loadComponent: () => import('./ong/profil/profil.page').then(m => m.ProfilPage)
      },
    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
];
