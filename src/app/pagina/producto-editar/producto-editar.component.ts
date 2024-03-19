import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../arquitectura/servicio/producto.service';
import Producto from '../../arquitectura/interface/producto.interface';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-producto-editar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './producto-editar.component.html',
  styleUrl: './producto-editar.component.css'
})

export class ProductoEditarComponent {


  // importa storage
  private storage: Storage= inject(Storage);
  // observables storage
  tomarUrlImg$!: Observable<String>;
  //funcion visualizar imagen ingresada
  visualizarImagenIngresada : any;

  
  formularioProducto: FormGroup;
  productos: Producto[];


  constructor(private productoservicio: ProductoService){
    this.formularioProducto = new FormGroup({
      categoria: new FormControl(),
      titulo: new FormControl(),
      stock: new FormControl(),
      precio: new FormControl(),
      descripcion: new FormControl(),
      imagen: new FormControl(),
    }),
    // Definir Productos para llamarlos
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

  

  // REGISTRAR PRODUCTOS
  // Sube producto a firebase con lo digilenciado en form
  async registrarProducto() {
    if (this.productoSeleccionado && this.productoSeleccionado.id) {
      // Si hay un producto seleccionado, se actualiza en lugar de agregar uno nuevo
      await this.productoservicio.actualizarProducto(this.productoSeleccionado.id, this.formularioProducto.value);
    } else {
      // Si no hay un producto seleccionado, se agrega un nuevo producto
      await this.productoservicio.agregarProducto(this.formularioProducto.value);
    }
    this.limpiarFormulario();
  }

  // OBTENER PRODUCTOS
  ngOnInit(): void {
    this.productoservicio.obtenerProducto().subscribe(producto => {
      this.productos = producto;
    })
  } 

   // ELIMINAR PRODUCTOS
   async onClickBorrar(producto: Producto){
    const response = await this.productoservicio.deleteProducto(producto);
  }
  
  // METODO PARA LIMPIAR EL FORMULARIO Y EL PRODUCTO SELECCIONADO
  // Agrega una variable para almacenar el producto seleccionado para editar
  productoSeleccionado: Producto | null = null;

  limpiarFormulario() {
    this.productoSeleccionado = null;
    this.formularioProducto.reset();
    this.visualizarImagenIngresada = null; // Borra la imagen visualizada
  }

  //EDITAR PRODUCTO (TRAE EL PRODUCTO SELECCIONADO AL FORMULARIO)
  editarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    // Establece los valores de los controles del formulario con los datos del producto seleccionado
    this.formularioProducto.patchValue({
      categoria: producto.categoria,
      titulo: producto.titulo,
      stock: producto.stock,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen
    });
    // Establece la imagen del producto seleccionado en visualizarImagenIngresada
    this.visualizarImagenIngresada = producto.imagen;   
  }




  // SUBIR IMAGEN A STORAGE  
  // mapea imagen y lo envia a subirImg
  imgRecibida(event:any){
    const archivoSeleccionado:File = event.target.files[0];
    this.subirImg(archivoSeleccionado);
    // visualiza la imagen que se ingresa ena registrar producto
    if (archivoSeleccionado) {
      const lector = new FileReader();
      lector.onload = (e: any) => {
        this.visualizarImagenIngresada = e.target.result;
      };
      lector.readAsDataURL(archivoSeleccionado);
    }
  }
  //sube imagen a Storage
  async subirImg(file:File){
    const rutaArchivo = `ImagenProducto/${file.name}`;
    const rutaReferencia = ref(this.storage, rutaArchivo);
    const subirArchivo = uploadBytesResumable(rutaReferencia, file);

    // lee el esado del proceso
    subirArchivo.on('state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Proceso de carga', progress);
      },
      (error) =>{
        console.error('Error al cargar el archivo', error)
      },
      async () =>{
        console.log("El archivo se Subio Exitosamente");
        const url = await getDownloadURL(rutaReferencia);
        console.log("URL del archivo", url);

        // Asignar la URL al FormControl de la imagen en el formulario
        this.formularioProducto.patchValue({
          imagen: url
        });

      }
      
    )
  }
}

