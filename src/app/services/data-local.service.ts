import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage, private toastCtrl: ToastController ) { }

  guardarPeliculas(pelicula: PeliculaDetalle){
    let existe = false;
    let mensaje = '';

    for( const peli of this.peliculas ){
      if( peli.id === pelicula.id ){
        existe = true;
        break;
      }
    }

    if( existe ){
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favorito';
    }else{
      this.peliculas.push( pelicula );
      mensaje = 'Agregado a favoritos';
    }
    this.storage.set('peliculas' ,this.peliculas);
  }
}
