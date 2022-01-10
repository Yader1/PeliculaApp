import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

   //Mostrar un poco del siguente slider
   slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  @Output() cargarMas = new EventEmitter();
  @Input() peliculas: Pelicula[] = [];


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
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
