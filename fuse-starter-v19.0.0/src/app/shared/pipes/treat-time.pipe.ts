import { Pipe, type PipeTransform } from '@angular/core'

export function treatTime(value: string | null = '') {
  if (!value) {
    return ''
  }

  const [hours, minutes] = value.split(':')
  return `${hours}:${minutes}`
}

@Pipe({
  name: 'treatTime',
})
export class TreatTimePipe implements PipeTransform {
  transform(value = '') {
    return treatTime(value)
  }
}
