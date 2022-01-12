import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage, private toastCtrl: ToastController ) {
    this.cargarFavoritos();
   }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async presentToast( message: string ){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async guardarPeliculas(pelicula: PeliculaDetalle){
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
      await this.storage.create();
      this.peliculas.push( pelicula );
      mensaje = 'Agregado a favoritos';
    }
    await this.storage.create();
    this.presentToast( mensaje );
    this.storage.set('peliculas' ,this.peliculas);

    return !existe;
  }

  async cargarFavoritos(){
    await this.storage.create();
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id ){
    
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
}
