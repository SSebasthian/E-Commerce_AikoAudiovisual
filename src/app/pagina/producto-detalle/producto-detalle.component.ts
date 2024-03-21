import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  productoSeleccionado: Producto | null = null;

  ngOnInit(): void {
    // Obtiene el producto seleccionado del localStorage
    const productoSeleccionadoJSON = localStorage.getItem('productoSeleccionado');
    if (productoSeleccionadoJSON) {
      this.productoSeleccionado = JSON.parse(productoSeleccionadoJSON);
      console.log('Producto Seleccionado:', this.productoSeleccionado);
    }
  }

}
