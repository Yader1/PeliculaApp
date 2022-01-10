import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  //Mostrar un poco del siguente slider
  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };

  @Input() peliculas: Pelicula[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
