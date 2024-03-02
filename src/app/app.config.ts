import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, getApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    provideClientHydration(), 
    importProvidersFrom([
      provideFirebaseApp(() => 
        initializeApp({
          apiKey: "AIzaSyBEZzAOhMx_Quprbbs-OnQoOzvUnYDyYow",
          authDomain: "aiko-audiovisual.firebaseapp.com",
          projectId: "aiko-audiovisual",
          storageBucket: "aiko-audiovisual.appspot.com",
          messagingSenderId: "934369803929",
          appId: "1:934369803929:web:1096f0d3dc67c3ac864208"
          })
        ),
        //configurar 
        provideFirestore(() => getFirestore()),
      ]), 
      importProvidersFrom(
        provideAuth(() => getAuth())), 
        importProvidersFrom(provideFirestore(() => getFirestore()
        ))
      ]
};
