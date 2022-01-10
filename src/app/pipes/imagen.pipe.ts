import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    //Cargar imagen por defecto
    if(!img){
      return './assets/no-image-banner.jpg';
    }

    //Si existe la imagen
    const imgUrl = `${ URL }/${ size }${ img }`;
    //console.log('URL', imgUrl);

    return imgUrl;
  }

}
