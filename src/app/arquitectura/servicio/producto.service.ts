import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';

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
  
  deleteProducto(producto: Producto) {
    const productoEliminar = doc(this.firestore, `producto/${producto.id}`);
    return deleteDoc(productoEliminar);
  }

  // Actualiza un producto existente en Firestore
  actualizarProducto(productoId: string, data: Partial<Producto>) {
    const productoReferencia = doc(this.firestore, `producto/${productoId}`);
    return updateDoc(productoReferencia, data);
  }
  
  // Obtiene producto pr categoria firebase
  obtenerProductosPorCategoria(categoria: string): Observable<Producto[]> {
    const productoCategoria = query(collection(this.firestore, 'producto'), where('categoria', '==', categoria));
    return collectionData(productoCategoria, { idField: 'id' }) as Observable<Producto[]>;
  }
}
