import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAqtlYuPwOTHxVSjt0bDwPJNYannThDuN4",
  authDomain: "poc-angular-firebase-af084.firebaseapp.com",
  projectId: "poc-angular-firebase-af084",
  storageBucket: "poc-angular-firebase-af084.appspot.com",
  messagingSenderId: "319955431628",
  appId: "1:319955431628:web:310a4ab7dd389fe1705269"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
    ])
  ]
};
