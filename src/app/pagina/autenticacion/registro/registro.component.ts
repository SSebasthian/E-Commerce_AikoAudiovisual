import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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

  
     EnvioRegistro(){
      
      };
}
