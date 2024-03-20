import { Component } from '@angular/core';
import Producto from '../../arquitectura/interface/producto.interface';
import { ProductoService } from '../../arquitectura/servicio/producto.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  productos: Producto[];

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
}
