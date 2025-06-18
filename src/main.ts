// import { bootstrapApplication } from '@angular/platform-browser';
// import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
// import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// import { routes } from './app/app.routes';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     provideIonicAngular(),
//     provideRouter(routes, withPreloading(PreloadAllModules)),
//   ],
// });
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importations Firebase

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from './environments/environment';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Configuration Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),       // Optionnel pour l'authentification
    provideStorage(() => getStorage()), // Optionnel pour le stockage de fichiers
    
    // ... autres providers si nécessaire
  ],
}).catch(err => console.error(err));