import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  //Array
  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  //Consumimo el servicio de movie
  constructor(private movieSrvice: MoviesService) {}

  ngOnInit(): void {
      this.movieSrvice.getFeature().subscribe(
        resp => {
          // console.log('Respusta', resp);
          this.peliculasRecientes = resp.results;
        }
      );

     this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieSrvice.getPopulares().subscribe(
      resp => {
        //console.log('Respusta', resp);
        //this.peliculasPopulares = resp.results;
        const arrTemp = [ ...this.peliculasPopulares, ...resp.results];
        this.peliculasPopulares = arrTemp;
      }
    );
  }

}
