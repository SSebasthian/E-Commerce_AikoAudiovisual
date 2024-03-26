import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { ProductoService } from '../../arquitectura/servicio/producto.service';
import { CarritoService } from '../../arquitectura/servicio/carrito.service';
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

  productosPorPagina: number = 12;
  paginaActual: number = 1;

  constructor(
    private productoservicio: ProductoService,
    private carritoService: CarritoService
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

  // Método para avanzar a la página siguiente
  irAPaginaSiguiente(): void {
    // Verifica si hay una página siguiente disponible
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      // Scroll hasta la parte superior de la página
      window.scrollTo(0, 0);
    }
  }

  // Método para retroceder a la página anterior
  irAPaginaAnterior(): void {
    // Verifica si hay una página anterior disponible
    if (this.paginaActual > 1) {
      this.paginaActual--;
      // Mueve el scroll hacia arriba de la página
      window.scrollTo(0, 0);
    }
  }

  // Método para calcular el índice de inicio de los productos en la página actual
  calcularInicio(): number {
    // Multiplica el número de la página actual menos 1 por el número de productos por página
    return (this.paginaActual - 1) * this.productosPorPagina;
  }

  // Método para calcular el índice final de los productos en la página actual
  calcularFin(): number {
    // Devuelve el mínimo entre el índice de inicio más el número de productos por página
    // y la longitud total de la lista de productos
    return Math.min(this.calcularInicio() + this.productosPorPagina, this.productos.length);
  }

  // Método para obtener el número total de páginas basado en la cantidad de productos y productos por página
  get totalPaginas(): number {
    // Calcula el número total de páginas necesarias para mostrar todos los productos
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  // Metodo para agregar el producto al LocalStorage
  agregarAlCarrito(producto: Producto, cantidad: number) {
    this.carritoService.agregarAlCarrito(producto, cantidad);
  }

  // Método para agregar un producto relacionado al carrito
  agregarProductoAlCarrito(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto, 1); // Agrega un solo producto
  }

}
