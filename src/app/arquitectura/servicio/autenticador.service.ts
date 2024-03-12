import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  UserCredential, 
  authState,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

// INTERFACE PARA CORREO Y CONTRASEÑA
export interface Credencial {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class AutenticadorService {
  private autenticador : Auth = inject(Auth);

  // GUARDA CREDENCIALES DE FORM
  registroCorreoContraseña(credencial: Credencial): Promise < UserCredential > {
    return createUserWithEmailAndPassword(
      this.autenticador,
      credencial.email,
      credencial.password
    );
  }


  constructor() { }
}
