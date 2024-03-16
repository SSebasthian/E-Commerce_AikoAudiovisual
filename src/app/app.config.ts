import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, getApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage'

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
          storageBucket: "gs://aiko-audiovisual.appspot.com",
          messagingSenderId: "934369803929",
          appId: "1:934369803929:web:1096f0d3dc67c3ac864208"
          })
        ),
        //configura componentes de Firestore 
        provideFirestore(() => getFirestore()),

        //configura componentes de Storage
        provideStorage(() => getStorage()),
      ]), 
      importProvidersFrom(
        provideAuth(() => getAuth())), 
        importProvidersFrom(provideFirestore(() => getFirestore()
        ))
      ]
};
