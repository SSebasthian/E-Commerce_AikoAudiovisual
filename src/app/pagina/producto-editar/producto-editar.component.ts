import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../arquitectura/servicio/producto.service';


@Component({
  selector: 'app-producto-editar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './producto-editar.component.html',
  styleUrl: './producto-editar.component.css'
})

export class ProductoEditarComponent {

  
}

