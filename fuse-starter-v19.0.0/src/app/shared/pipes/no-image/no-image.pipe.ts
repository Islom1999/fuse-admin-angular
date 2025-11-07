import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
  transform(imageUrl: string | null | undefined) {
    return imageUrl ? imageUrl : './images/no-image.png'
  }
}
