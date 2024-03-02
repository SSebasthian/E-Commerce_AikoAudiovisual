import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './compartido/menu/menu.component';
import { PiePaginaComponent } from './compartido/pie-pagina/pie-pagina.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, MenuComponent, PiePaginaComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
    
})


export class AppComponent {
  title = 'aiko-audiovisual';
  
}

