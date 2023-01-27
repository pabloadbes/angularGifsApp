import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '0QVuLVsoOpE3VuKt7JtOOVTWtggSysW0';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [] ;
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

  buscarGifs( termino: string ): void {

    termino = termino.trim().toLowerCase();

    if ( termino.trim().length === 0 ) { return }

    if ( !this._historial.includes( termino) ) {
      this._historial.unshift( termino );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify(this._historial) );
    }

    const params = new HttpParams()
          .set('api_key', this._apiKey)
          .set('limit', '10')
          .set('q', termino);
          


    this.http.get<SearchGifsResponse>(`${ this._servicioUrl }/search`, { params })
      .subscribe( resp => {
        this.resultados = resp.data;
        localStorage.setItem( 'resultados', JSON.stringify(this.resultados) );
      })
  }
}
