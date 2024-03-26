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
    } 

}

