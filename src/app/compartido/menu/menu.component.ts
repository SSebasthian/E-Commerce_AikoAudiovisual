import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuAbierto: boolean = false;

  cambioMenuResponsive(){
    // SI EL CHECK DEL MENU RESPONSIVE SE OBRIME SE PASA A VERDADERO
    // Y MUESTRA CAMBIOS DE CSS POR LA CLASE
    this.menuAbierto= !this.menuAbierto;
    console.log(this.menuAbierto)
    
  }

}
