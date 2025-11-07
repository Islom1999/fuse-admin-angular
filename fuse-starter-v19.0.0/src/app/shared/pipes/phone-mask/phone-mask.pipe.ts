import { Pipe, type PipeTransform } from '@angular/core'

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phone: string | undefined | null): string {
    if (phone === null || phone === undefined) {
      return '-'
    }

    if (!phone.startsWith('+')) {
      phone = `+${phone}`
    }

    if (phone.length === 13) {
      const countryCode = phone.slice(1, 4)
      const operatorCode = phone.slice(4, 6)
      const part1 = phone.slice(6, 9)
      const part2 = phone.slice(9, 11)
      const part3 = phone.slice(11, 13)
      return `+${countryCode} ${operatorCode} ${part1} ${part2} ${part3}`
    }
    return phone
  }
}
