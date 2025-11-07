import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'treatNbsp',
})
export class TreatNbspPipe implements PipeTransform {
  transform(value: string | null | undefined) {
    return value?.replace(/&nbsp;/g, ' ')
  }
}
