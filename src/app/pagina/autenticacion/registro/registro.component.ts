import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AutenticadorService, Credencial } from '../../../arquitectura/servicio/autenticador.service';
import Cliente from '../../../arquitectura/interface/cliente.interface';

interface registroForm{
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,    
  ],
  providers:[],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})



export class RegistroComponent {

  // Mostrar Ocultar Contraseña FORMULARIO
  mostrarOcultarClave = true;

  formBuilder = inject(FormBuilder);
  
  // private AutenticadorService = inject(AutenticadorService);
  private _router = inject(Router);

  // Se llama servicio autenticador
  private AutenticadorService = inject(AutenticadorService);

  // SE VALIDA QUE LOS DATOS ESTEN VALIDOS FORMULARIO
  formularioRegistro: FormGroup<registroForm> = this.formBuilder.group({
    // VALIDACION USUARIO
    name: this.formBuilder.control('',{
      validators: Validators.required,
      nonNullable: true,
    }),
    // VALIDACION CORREO
    email: this.formBuilder.control('',{
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    // VALIDACION CONTRASEÑA
    password: this.formBuilder.control('',{
      validators: Validators.required,
      nonNullable: true,
    }),
  });

   
  // SE VALIDA MENSAJE ERROR EN CORREO
    get validacionCorreo(): string | boolean {
      const control = this.formularioRegistro.get('email');
      const esValido = control?.invalid && control.touched;

      if (esValido) {
        return control.hasError('required')
          ? 'Campo Requerido'
          : 'Correo Invalido';
        };
        return false;
      };

      // GUARDA CREDENCIALES DE FORM Y LO ENVIA AL SERVICIO
      async EnvioRegistro(): Promise<void>{
        if (this.formularioRegistro.invalid) return;
        // Trae las credeciales ingresadas por el usuario
        const credencial : Credencial ={
          email: this.formularioRegistro.value.email || '',
          password: this.formularioRegistro.value.password || '',
        };
        // Si el registro es correcto se envian datos a firebase y redirige al usuario a inicio
        try {
          const userCredentials = await this.AutenticadorService.registroCorreoContraseña(credencial);
          // Obtenemos el UID del usuario registrado
          const usuarioUID = await this.AutenticadorService.guardaIDusuario();
          // Creamos un objeto Cliente con los datos del formulario
          const cliente: Cliente = {
            id: usuarioUID || '',
            usuario: this.formularioRegistro.value.name || '',
            correo: this.formularioRegistro.value.email || '',
            contraseña: this.formularioRegistro.value.password || ''
          };

          // Guardamos el usuario en Firestore
          await this.AutenticadorService.guardarUsuarioEnFirestore(cliente);
          console.log(usuarioUID)
          this. _router.navigateByUrl('perfil')

        } 
        // Si el registro no es correcto envia error
        catch (error) {
          console.log(error)
        }
        // muestra datos en consola
        console.log(this.formularioRegistro.value);
    }

}
