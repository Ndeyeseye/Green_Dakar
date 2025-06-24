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
      {
        path: 'mes-signalements',
       loadComponent: () => import('./citoyen/mes-signalements/mes-signalements.page').then( m => m.MesSignalementsPage)
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
  {
    path: 'edit-profile',
    loadComponent: () => import('./citoyen/modals/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./citoyen/modals/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./citoyen/modals/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./mairie/modals/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./mairie/modals/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./mairie/modals/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },


  {
  path: 'ong/ajout-evenement',
  loadComponent: () =>
    import('./ong/ajout-evenement/ajout-evenement.page').then((m) => m.AjoutEvenementPage),
  },
  {
    path: 'ong/register-ong',
    loadComponent: () => import('./ong/register-ong/register-ong.page').then( m => m.RegisterOngPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./ong/modals/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./ong/modals/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./ong/modals/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
  {

    path: 'ajout-sensibilisation',
    loadComponent: () => import('./ong/ajout-sensibilisation/ajout-sensibilisation.page').then( m => m.AjoutSensibilisationPage)
  },
{
    path: 'edit-evenement',
    loadComponent: () => import('./ong/edit-evenement/edit-evenement.page').then( m => m.EditEvenementPage)
  },
{
  path: 'mairie/alertes',
  loadComponent: () => import('./mairie/pages/alertes/alertes.page').then(m => m.AlertesPage)
}


];
