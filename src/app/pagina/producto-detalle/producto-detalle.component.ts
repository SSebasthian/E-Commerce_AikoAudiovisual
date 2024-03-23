import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  productoSeleccionado: Producto | null = null;
  cantidad: number = 1; // Inicializa la cantidad en 1

  ngOnInit(): void {
    // Obtiene el producto seleccionado del localStorage
    const productoSeleccionadoJSON = localStorage.getItem('productoSeleccionado');
    if (productoSeleccionadoJSON) {
      this.productoSeleccionado = JSON.parse(productoSeleccionadoJSON);
      console.log('Producto Seleccionado:', this.productoSeleccionado);
    }
  }

  // ESTE METODO INGREMENTA LA CANTIDAD EN EL ARTICULO
  incrementarCantidad() {
    if (this.productoSeleccionado && this.cantidad < this.productoSeleccionado.stock) {
      this.cantidad++;
    }
  }

  // ESTE METODO DISMINUYE LA CANTIDAD EN EL ARTICULO
  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
  
  // ESTE METODO VALIDA LA CANTIDAD EN EL ARTICULO Y NO PERMITE SUPERAR ESTE STOCK
  validarCantidad() {
    if (this.productoSeleccionado && this.cantidad > this.productoSeleccionado.stock) {
      this.cantidad = this.productoSeleccionado.stock; // Ajusta la cantidad al máximo stock disponible
    }
  }

}
