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

  formularioProducto: FormGroup;


  constructor(private productoservicio: ProductoService){
    this.formularioProducto = new FormGroup({
      categoria: new FormControl(),
      titulo: new FormControl(),
      stock: new FormControl(),
      precio: new FormControl(),
      descripcion: new FormControl(),
      imagen: new FormControl(),
    })
  }

  async registrarProducto() {
    console.log(this.formularioProducto.value)
    const productoGuardado = await this.productoservicio.agregarProducto(this.formularioProducto.value)
    console.log(productoGuardado);
  }
}

