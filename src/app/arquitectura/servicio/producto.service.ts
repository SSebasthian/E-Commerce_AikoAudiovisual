import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';

import { addDoc, collection } from 'firebase/firestore';
import Producto from '../interface/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //se injecta firestore
  constructor(private firestore: Firestore) {  }

  //se llama interface Producto
  // localstrore agregar producto

  agregarProducto(producto: Producto){
    //se guarda coleccion del formulario en base de datos
    const productoReferencia = collection(this.firestore, 'producto');
    return addDoc(productoReferencia, producto);
  }

  obtenerProducto(): Observable<Producto[]>{
    const productoReferencia = collection(this.firestore, 'producto');
    return collectionData(productoReferencia,{
      idField: 'id'
    }) as Observable<Producto[]>;
  }
  
 

  
}
