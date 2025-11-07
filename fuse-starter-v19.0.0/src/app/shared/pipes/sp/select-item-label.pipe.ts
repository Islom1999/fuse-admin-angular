import { Pipe, type PipeTransform } from '@angular/core'
import { ObjToStringPipe } from './obj-to-string.pipe'

@Pipe({
  name: 'selectItemLabel',
  standalone: true,
})
export class SelectItemLabelPipe extends ObjToStringPipe implements PipeTransform {
  override transform(value: number | string, items: any[] | any[] | null) {
    return super.transform(value, items, 'value')
  }
}
