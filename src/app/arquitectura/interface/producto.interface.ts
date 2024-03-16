export default interface Producto{
    id? :string;
    categoria: string;
    titulo:string;
    stock:number;
    precio:number;
    descripcion:string;
    imagen:string;
    fecha?: Date;
  }