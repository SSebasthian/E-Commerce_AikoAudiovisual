import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AutenticadorService } from '../servicio/autenticador.service';


export const routerInjection = () => inject(Router);


 // SE VALIDA SI EL USUARIO ESTA LOGUEADO O NO (ESTA EN EL SERVICIO)
export const estadoIngresoSistemaObservable$ = () => inject(AutenticadorService).estadoIngresoSistema$;



// SI EL USUARIO NO HA INICIADO SESION ESTE NO PUEDE VER RUTA PRIVADA (PERFIL)
// SE GUARDA LA EJECUCION DE LA FUNCION ROUTER INJECTION
export const estadoPrivado: CanActivateFn = () => {
  const router = routerInjection();

    //  OBSERVA SI EL USUARIO INGRESO O SE REGISTRO AL SISTEMA
  return estadoIngresoSistemaObservable$().pipe(
    // PERMITE CAMBIAR INFORMACION TRUE O FALSE
    map((user) => {
      if (!user) {
        // SI EL USUARIO NO ESTA REGISTRADO LO REDIRIGE A ACCESO
        router.navigateByUrl('autenticacion/acceso');
        return false;
      }
      return true;
    })
  );
};

// SI EL USUARIO INGRESO AL SISTEMA PERMITE VER RUTA PRIVADA (PERFIL)

export const estadoPublico: CanActivateFn = () => {
    const router = routerInjection();
  
    return estadoIngresoSistemaObservable$().pipe(
      map((user) => {
        if (user) {
          router.navigateByUrl('perfil');
          return false;
        }
        return true;
      })
    );
  };



