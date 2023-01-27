import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private gifs: GifsService
  ) { }

  get historial( ) {
    return this.gifs.historial;
  }

  buscar( termino: string ) {
    this.gifs.buscarGifs( termino );
  }
}
