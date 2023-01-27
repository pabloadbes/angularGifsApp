import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(
    private gifs: GifsService
  ) {}

  buscar() {
    const value = this.txtBuscar.nativeElement.value;
    
    if ( value.trim().length === 0 ) { return }
    
    this.gifs.buscarGifs( value );
    this.txtBuscar.nativeElement.value = '';
  }
}
