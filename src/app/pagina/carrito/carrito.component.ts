import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../arquitectura/servicio/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    FormsModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  totalPagar: number = 0;

  constructor(public carritoService: CarritoService) { }


  ngOnInit(): void {
    // Cargar el carrito desde el almacenamiento local al iniciar el componente
    this.carritoService.cargarCarritoLocalStorage();
    this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de aumentar la cantidad
  }

  eliminarDelCarrito(productoId: string) {
    this.carritoService.eliminarDelCarrito(productoId);
    this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de aumentar la cantidad
  }
  
  aumentarCantidad(productoCarrito: any) {
    if (productoCarrito.cantidad < productoCarrito.producto.stock) {
      productoCarrito.cantidad++;
      this.carritoService.guardarCarritoLocalStorage(); // Guardar en localStorage
      this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de disminuir la cantidad


    } else {
      alert('Llegaste al Limite de existecia disponible');
    }
  }

  disminuirCantidad(productoCarrito: any) {
    if (productoCarrito.cantidad > 1) {
      productoCarrito.cantidad--;
      this.carritoService.guardarCarritoLocalStorage(); // Guardar en localStorage
      this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de disminuir la cantidad
    }
  }

  calcularTotalAPagar() {
    this.totalPagar = this.carritoService.carrito.reduce((acc, item) => {
      return acc + (item.producto.precio * item.cantidad);
    }, 0);
  }
}
