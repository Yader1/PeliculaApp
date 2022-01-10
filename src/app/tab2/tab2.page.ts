import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../components/detalles/detalles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Matrix', 'El señor de los anillos'];

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) {}

  buscar( event ){
    const valor: string = event.detail.value;

    //Si el valor es vacio
    if( valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.movieService.buscarPelicula( valor ).subscribe( resp=> {
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async verDetalle( id: string ){
    const modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }

}
