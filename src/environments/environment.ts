// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyANOw0DuVOaG074GIsvAkgSffL9V_wz0fI",
    authDomain: "greendakar-cf99d.firebaseapp.com",
    projectId: "greendakar-cf99d",
    storageBucket: "greendakar-cf99d.appspot.com", // 🔁 corrigé ici aussi
    messagingSenderId: "104820823599",
    appId: "1:104820823599:web:735d17ea304c0e5e9098da"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
