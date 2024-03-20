import { Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { ServicioComponent } from './pagina/servicio/servicio-principal/servicio.component';
import { ContactoComponent } from './pagina/contacto/contacto.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { ProductoDetalleComponent } from './pagina/producto-detalle/producto-detalle.component';
import { ProductoEditarComponent } from './pagina/producto-editar/producto-editar.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
import { AccesoComponent } from './pagina/autenticacion/acceso/acceso.component';
import { RegistroComponent } from './pagina/autenticacion/registro/registro.component';
import { Error404Component } from './pagina/error404/error404.component';
import { PoliticaPrivacidadComponent } from './pagina/politicas/politica-privacidad/politica-privacidad.component';
import { PoliticaReembolsoComponent } from './pagina/politicas/politica-reembolso/politica-reembolso.component';
import { TerminosEnvioComponent } from './pagina/politicas/terminos-envio/terminos-envio.component';
import { TerminosServicioComponent } from './pagina/politicas/terminos-servicio/terminos-servicio.component';
import { PerfilComponent } from './pagina/perfil/perfil.component';

import { estadoPrivado, estadoPublico } from './arquitectura/enrutamiento/autenticador.guard';





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
    {path: 'producto-editar',
        component:ProductoEditarComponent,
        canActivate: [estadoPrivado]
    },
    {path: 'carrito',
        component:CarritoComponent
    },
    {path: 'autenticacion',
        canActivate: [estadoPublico],
        children:[
                {path: 'acceso',
                component:AccesoComponent
            },
                {path: 'registro',
                component:RegistroComponent
            },
        ],
    },
    {path: 'perfil',
        component:PerfilComponent,
        canActivate: [estadoPrivado]
    },
    {
        path: 'politica',
        children:[
            {path: 'politica-privacidad',
                component:PoliticaPrivacidadComponent
            },
            {path: 'politica-reembolso',
                component:PoliticaReembolsoComponent
            },
            {path: 'terminos-servicio',
                component:TerminosServicioComponent
            },
            {path: 'terminos-envio',
                component:TerminosEnvioComponent
            },
        ]
    },
    {path: '**',
        component: Error404Component
    }
];