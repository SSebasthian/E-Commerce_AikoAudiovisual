import { Injectable, inject } from '@angular/core';
import Producto from '../interface/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

    carrito:{
      producto: Producto;
      cantidad: number
    } []=[];

    constructor() {
      // Cargar el carrito desde el almacenamiento local al iniciar el servicio
      this.cargarCarritoLocalStorage();
    }

    // Guarda producto del carrito en localStorage
    guardarCarritoLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
 
    // Trae los productos Carrito localStorage
    cargarCarritoLocalStorage() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    }


    agregarAlCarrito(producto: Producto, cantidad: number = 1) {
      // Lógica para agregar producto al carrito...
      const index = this.carrito.findIndex(item => item.producto.id === producto.id);
      if (index !== -1) {
        this.carrito[index].cantidad += cantidad;
      } else {
        this.carrito.push({ producto, cantidad });
      }
      // Después de agregar el producto, guardar el carrito en el almacenamiento local
      this.guardarCarritoLocalStorage();
      alert("Se Agrego El Producto Al Carrito");
    } 

    eliminarDelCarrito(productoId: string) {
      // Encuentra el índice del producto en el carrito
      const index = this.carrito.findIndex(item => item.producto.id === productoId);
      // Verifica si se encontró el producto
      if (index !== -1) {
        // Reducir la cantidad del producto en 1
        if (this.carrito[index].cantidad > 1) {
          this.carrito[index].cantidad--;
        } else {
          // Si la cantidad es 1, elimina completamente el producto del carrito
          this.carrito.splice(index, 1);
        }
        // Después de actualizar el carrito, guardar en el almacenamiento local
        this.guardarCarritoLocalStorage();
      }
    }

    obtenerCantidadTotalProductosEnCarrito(): number {
      const total = this.carrito.reduce((total, item) => total + item.cantidad, 0);
      console.log('Cantidad total de productos en carrito:', total);
      return total;
    }

}

