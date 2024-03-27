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

  constructor(public carritoService: CarritoService) { }


  ngOnInit(): void {
    // Cargar el carrito desde el almacenamiento local al iniciar el componente
    this.carritoService.cargarCarritoLocalStorage();
  }

  eliminarDelCarrito(productoId: string) {
    this.carritoService.eliminarDelCarrito(productoId);
  }
  
}
