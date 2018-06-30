// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConf : {
    apiKey: "AIzaSyAc5tBRzRW5seB6X-nT-v74h9FvoEC6WCE",
    authDomain: "angular-cf-test.firebaseapp.com",
    databaseURL: "https://angular-cf-test.firebaseio.com",
    projectId: "angular-cf-test",
    storageBucket: "",
    messagingSenderId: "317369973612"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
