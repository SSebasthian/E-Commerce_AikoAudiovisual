import { Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { ServicioComponent } from './pagina/servicio/servicio.component';
import { ContactoComponent } from './pagina/contacto/contacto.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { ProductoDetalleComponent } from './pagina/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { AccesoComponent } from './pagina/autenticacion/acceso/acceso.component';
import { RegistroComponent } from './pagina/autenticacion/registro/registro.component';
import { Error404Component } from './pagina/error404/error404.component';



export const routes: Routes = [
    {path: '',
        component:InicioComponent
    },
    {path: 'inicio',
        component:InicioComponent
    },
    {path: 'servicio',
        component:ServicioComponent
    },
    {path: 'contacto',
        component:ContactoComponent
    },
    {path: 'producto',
        component:ProductoComponent
    },
    {path: 'producto-detalle',
        component:ProductoDetalleComponent
    },
    {path: 'carrito',
        component:CarritoComponent
    },
    {path: 'acceso',
        component:AccesoComponent
    },
    {path: 'registro',
        component:RegistroComponent
    },
    {path: '**',
        component: Error404Component
    }
];