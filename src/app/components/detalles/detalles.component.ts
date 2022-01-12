import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 300;
  actores: Cast[] = [];
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private movieService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    //console.log('ID', this.id);
    this.dataLocal.existePelicula( this.id ).then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );

    this.movieService.getPeliculaDetalle( this.id ).subscribe(
      resp => {
        this.pelicula = resp;
      }
    )

    this.movieService.getPeliculaActores( this.id ).subscribe(
      resp => {
        //console.log(resp);
        this.actores = resp.cast;
      }
    )
  }

  favorito(){
    const existe = this.dataLocal.guardarPeliculas( this.pelicula );
    this.estrella = ( existe ) ? 'star' : 'star-outline';
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

}
