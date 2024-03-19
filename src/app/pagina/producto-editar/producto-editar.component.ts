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
    console.log(this.formularioProducto.value)
    const productoGuardado = await this.productoservicio.agregarProducto(this.formularioProducto.value)
    console.log(productoGuardado);
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

