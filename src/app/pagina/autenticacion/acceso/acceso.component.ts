import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AutenticadorService } from '../../../arquitectura/servicio/autenticador.service';



interface LogInForm{
  email: FormControl<string>;
  password: FormControl<string>;
}


@Component({
  selector: 'app-acceso',
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
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})


export class AccesoComponent {

  // Mostrar Ocultar Contraseña FORMULARIO
  mostrarOcultarClave = true;

  // private AutenticadorService = inject(AutenticadorService);
  formBuilder = inject(FormBuilder);


  // Redireccion a pagina despues de iniciar sesion
  private router = inject(Router);


  // SE VALIDA QUE LOS DATOS ESTEN VALIDOS FORMULARIO
  formularioAcceso: FormGroup<LogInForm> = this.formBuilder.group({
    // VALIDACION CORREO
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    // VALIDACION CONTRASEÑA
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  

  // SE VALIDA MENSAJE ERROR EN CORREO
  get validacionCorreo(): string | boolean {
    const control = this.formularioAcceso.get('email');
    const esValido = control?.invalid && control.touched;

    if (esValido) {
      return control.hasError('required')
        ? 'Campo Requerido'
        : 'Correo Invalido';
      }
      return false;
  }

    envioAcceso(){
      
  }
}
