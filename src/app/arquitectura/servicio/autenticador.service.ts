import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  UserCredential, 
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

  // SE VALIDA SI EL USUARIO ESTA LOGUEADO O NO
  readonly estadoIngresoSistema$ = authState(this.autenticador);

  // TRAE DATOS DE FORM Y SI TODO ESTA BIEN LO REGISTRA EN FIREBASE
  registroCorreoContraseña(credencial: Credencial): Promise < UserCredential > {
    return createUserWithEmailAndPassword(
      this.autenticador,
      credencial.email,
      credencial.password
    );
  }

  // VALIDA SI EXISTE LOS DATOS Y I TODO ESTA BIEN PERMITE EL INGRESO
  accesoCorreoContraseña(credencial: Credencial){
    return signInWithEmailAndPassword(
      this.autenticador,
      credencial.email,
      credencial.password
    );
  }


  //DESLOGUEO
  cerrarSesion(): Promise<void>{
    return this.autenticador.signOut()
  }

  constructor() { }
}
