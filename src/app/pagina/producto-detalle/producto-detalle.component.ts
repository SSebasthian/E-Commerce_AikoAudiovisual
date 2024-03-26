import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../arquitectura/servicio/producto.service';
import { CarritoService } from '../../arquitectura/servicio/carrito.service';



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
  productosRelacionadosCategotia: Producto[] = [];
  cantidad: number = 1; // Inicializa la cantidad en 1

  constructor(
      private productoService: ProductoService,
      private carritoService: CarritoService
    ) {}

    // ME ACTUALIZA LA PAGINA DETALLE CON EL LOCALSTORAGE
    ngOnInit(): void {
      // Scroll hasta la parte superior de la página
      window.scrollTo(0, 0);
      // Obtener el producto seleccionado y productos relacionados
     this.obtenerProductoSeleccionado();
    }

      // ESTE METODO ME TRAE EL PRODUCTO SELECCIONADO QUE SE ENCUENTRA EN LOCALSTORAGE
  obtenerProductoSeleccionado() {
    const productoSeleccionadoJSON = localStorage.getItem('productoSeleccionado');
    if (productoSeleccionadoJSON) {
      this.productoSeleccionado = JSON.parse(productoSeleccionadoJSON);
      console.log('Producto Seleccionado:', this.productoSeleccionado);
      this.obtenerProductosRelacionados();
    }
  }

  // ESTE METODO ME TRAE 4 PRODUCTOS DE LA BASE DE DATOS SEGUN SU CATEGORIA
  obtenerProductosRelacionados() {
    if (this.productoSeleccionado && this.productoSeleccionado.categoria) {
      this.productoService.obtenerProductosPorCategoria(this.productoSeleccionado.categoria)
        .subscribe(productos => {
          // Obtener una muestra aleatoria de 4 productos
          const productosAleatorios = this.obtenerMuestraAleatoria(productos, 4);
          // Excluir el producto seleccionado de la muestra
          this.productosRelacionadosCategotia = productosAleatorios.filter(producto => producto.id !== this.productoSeleccionado?.id);
        });
    }
  }

  // METODO PARA OBTENER PRODUCTOS ALEATORIOS DE FIREBASE SEGUN CATEGORIA
  obtenerMuestraAleatoria(array: any[], cantidad: number) {
    const muestra = [];
    const longitud = array.length;
    const indicesUsados = new Set()
    if (longitud <= cantidad) {
      return array;
    }
    while (muestra.length < cantidad) {
      const indice = Math.floor(Math.random() * longitud);
      if (!indicesUsados.has(indice)) {
        muestra.push(array[indice]);
        indicesUsados.add(indice);
      }
    }
    return muestra;

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

  // ESTE METODO ME LLEVA EL PRODUCTO SIMILAR AL LOCALSTORAGE POR ENDE ACTUALIZA LA PAGINA
  mostrarDetalle(producto: Producto) {
    this.productoSeleccionado = producto;
      console.log('Producto seleccionado:', this.productoSeleccionado);
      localStorage.setItem('productoSeleccionado', JSON.stringify(this.productoSeleccionado));
      this.obtenerProductosRelacionados();

      // Scroll hasta la parte superior de la página
      window.scrollTo(0, 100);
  }

  agregarAlCarrito() {
    if (this.productoSeleccionado && this.cantidad > 0) {
      // Verificar si la cantidad seleccionada es mayor que el stock disponible
      if (this.cantidad <= this.productoSeleccionado.stock) {
        // Agregar el producto al carrito
        this.carritoService.agregarAlCarrito(this.productoSeleccionado, this.cantidad);
        // Restablecer la cantidad a 1 después de agregar el producto
        this.cantidad = 1;
        
      } else {
        alert("No hay suficiente stock disponible");
      }
    } else {
      alert("Seleccione una cantidad válida");
    }
  }
  
  // Metodo para agregar el producto al LocalStorage
  agregarAlCarritoProductoOpcion(producto: Producto, cantidad: number) {
    this.carritoService.agregarAlCarrito(producto, cantidad);
  }

  // Método para agregar un producto relacionado al carrito
  agregarProductoAlCarrito(producto: Producto) {
    this.carritoService.agregarAlCarrito(producto, 1); // Agrega un solo producto
  }
 
}
