import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../arquitectura/servicio/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    FormsModule,
    RouterLink
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  totalPagar: number = 0;
  totalProductosEnCarrito: number = 0;

  constructor(public carritoService: CarritoService) { 
    this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() al cargar el carrito desde el almacenamiento local
  }


  ngOnInit(): void {
    // Cargar el carrito desde el almacenamiento local al iniciar el componente
    this.carritoService.cargarCarritoLocalStorage();
    this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de aumentar la cantidad
    this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() después de eliminar un producto
  }

  eliminarDelCarrito(productoId: string) {
    this.carritoService.eliminarDelCarrito(productoId);
    this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de aumentar la cantidad
    this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() después de eliminar un producto
  }
  
  aumentarCantidad(productoCarrito: any) {
    if (productoCarrito.cantidad < productoCarrito.producto.stock) {
      productoCarrito.cantidad++;
      this.carritoService.guardarCarritoLocalStorage(); // Guardar en localStorage
      this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de disminuir la cantidad
      this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() después de eliminar un producto
      this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() después de eliminar un producto
    } else {
      alert('Llegaste al Limite de existecia disponible');
    }
  }

  disminuirCantidad(productoCarrito: any) {
    if (productoCarrito.cantidad > 1) {
      productoCarrito.cantidad--;
      this.carritoService.guardarCarritoLocalStorage(); // Guardar en localStorage
      this.calcularTotalAPagar(); // Llama a calcularTotalAPagar después de disminuir la cantidad
      this.actualizarTotalProductosEnCarrito(); // Llama a actualizarTotalProductosEnCarrito() después de eliminar un producto

    }
  }

  calcularTotalAPagar() {
    this.totalPagar = this.carritoService.carrito.reduce((acc, item) => {
      return acc + (item.producto.precio * item.cantidad);
    }, 0);
  }

  actualizarTotalProductosEnCarrito() {
    this.totalProductosEnCarrito = this.carritoService.obtenerCantidadTotalProductosEnCarrito();
  }  
}
