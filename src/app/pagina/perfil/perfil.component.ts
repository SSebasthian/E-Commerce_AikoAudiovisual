import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutenticadorService } from '../../arquitectura/servicio/autenticador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private _router = inject(Router);

  private authservice = inject(AutenticadorService);

  
}
