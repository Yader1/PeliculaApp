import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

//Variables Globales
const api = environment.url;
const apikey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  constructor( private http: HttpClient) { }

  //Ejercutar query
  private ejecutarQuery<T>( query: string ){
    query = api + query;
    query += `&api_key=${ apikey }&language=es&include_image_language=es`;
    console.log( query )
    return this.http.get<T>( query );
  }

  //Get de la lista de peliculas actuales
  getFeature(){
    //Manterner las fechas actualizadas
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    
    const mes = hoy .getMonth() +1;
    let mesString;

    if( mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    //Costruimos la fechas
    const inicio = `${ hoy.getFullYear }-${ mesString }-01`;
    const final = `${ hoy.getFullYear }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=2021-12-15&primary_release_date.lte=2022-01-08`);
  }

  //Get lista de populares
  getPopulares(){
    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  //Get Detalle de pelicula
  getPeliculaDetalle( id: string ){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  //Get actores de pelicula
  getPeliculaActores( id: string ){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  //buscar
  buscarPelicula( text: string ){
    return this.ejecutarQuery(`/search/movie?query=${ text }`);
  }
}
