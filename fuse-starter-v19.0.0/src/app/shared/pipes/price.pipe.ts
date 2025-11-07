import { DecimalPipe } from '@angular/common'
import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'price',
})
export class PricePipe extends DecimalPipe implements PipeTransform {
  override transform(value: number | string | undefined | null): any {
    if (value) return (super.transform(value, '1.0-0', 'ru') || '0') + ' UZS'

    return '0 UZS'
  }
}
