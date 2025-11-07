import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'objToString',
  standalone: true,
})
export class ObjToStringPipe implements PipeTransform {
  transform(
    value: number | string,
    items: any[] | any[] | null,
    valueKey: string,
    labelKey = 'label',
  ) {
    if (!value || !items) {
      return ''
    }

    return items.find((item) => item[valueKey] == value)?.[labelKey] || ''
  }
}
