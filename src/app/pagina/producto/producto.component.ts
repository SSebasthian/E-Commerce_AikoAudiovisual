import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { ProductoService } from '../../arquitectura/servicio/producto.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  productos: Producto[];
  productoSeleccionado: Producto | null = null; // Variable para almacenar el producto Seleccionado
  uidProducto: string | null = null; // Variable para almacenar el ID del producto seleccionado


  constructor(
    private productoservicio: ProductoService,
  ){
      this.productos = [{
      categoria: '',
      titulo:'',
      stock:0,
      precio: 0,
      descripcion:'',
      imagen: '',
      fecha: new Date(),
    }];
  }
  ngOnInit(): void {
    this.productoservicio.obtenerProducto().subscribe(producto => {
      this.productos = producto;
    })
  }


   // Método para guardar el producto seleccionado
   mostrarDetalle(producto: Producto) {
    this.productoSeleccionado = producto;
    console.log('Producto seleccionado:', this.productoSeleccionado);
    this.uidProducto = producto.id !== undefined ? producto.id : null;
    console.log('Producto ID:', this.uidProducto);
    localStorage.setItem('productoSeleccionado', JSON.stringify(this.productoSeleccionado));
  }



}
