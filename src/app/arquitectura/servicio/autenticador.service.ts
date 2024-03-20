import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  UserCredential, 
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Cliente from '../interface/cliente.interface';

// INTERFACE PARA CORREO Y CONTRASEÑA
export interface Credencial {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class AutenticadorService {

  // SE AGREGA FIREBASE PARA REGISTRAR EL USUARIO REGISTRADO EN BASE DE DATOS
  constructor(private firestore: Firestore) { }

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


  // SE AGREGA USUARIO REGISTRADO A BASE DE DATOS

  // SE TOMA EL ID DE USUARIO REGISTRADO
  async guardaIDusuario(){
    const user = await this.autenticador.currentUser;
    if (user === undefined){
      return null;
    } else{
      return user!.uid
    }
  }

  // SE GUARDA EL USUARIO EN BASE DE DATOS
  async guardarUsuarioEnFirestore(cliente: Cliente) {
    const productoReferencia = collection(this.firestore, 'cliente');
    return addDoc(productoReferencia, cliente);
  }

  
}
