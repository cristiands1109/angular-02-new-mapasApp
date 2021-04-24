import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class MenuComponent implements OnInit {

  menuItems: Menu [] =[
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
