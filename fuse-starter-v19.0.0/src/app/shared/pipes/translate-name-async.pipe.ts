import { inject, Pipe, type PipeTransform } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { map, of } from 'rxjs'

interface TranslateName {
  nameEn: null | string
  nameKr: null | string
  nameRu: string
  nameUz: string
}

@Pipe({
  name: 'translateNameAsync',
})
export class TranslateNameAsyncPipe implements PipeTransform {
  private $transloco = inject(TranslocoService)

  transform(value: TranslateName | undefined) {
    if (value)
      return this.$transloco.langChanges$.pipe(
        map((lang) => {
          return value[`name${toTitleCase(lang)}` as keyof TranslateName]
        }),
      )

    return of('-')
  }
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  )
}
