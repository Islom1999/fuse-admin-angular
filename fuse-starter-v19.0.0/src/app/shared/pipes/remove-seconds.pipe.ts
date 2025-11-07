import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'removeSeconds',
})
export class RemoveSecondsPipe implements PipeTransform {
  transform(time: string | null | undefined) {
    const [hours, minutes] = (time ?? '00:00:00').split(':')
    return `${hours}:${minutes}`
  }
}
