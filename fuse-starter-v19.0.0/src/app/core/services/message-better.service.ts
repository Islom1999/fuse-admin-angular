import { inject, Injectable } from '@angular/core'
import { MessageService, ToastMessageOptions } from 'primeng/api'
import { StorageService } from './storage.service'
import { TranslocoService } from '@ngneat/transloco'

@Injectable()
export class MessageBetterService extends MessageService {
  private $transloco = inject(TranslocoService)

  override add(message: ToastMessageOptions): void {
    this.$transloco.load(StorageService.currentLanguage).subscribe(() => {
      if (message.summary) message.summary = this.$transloco.translate(message.summary)

      if (message.detail) message.detail = this.$transloco.translate(message.detail)

      message.life = message.life || 3000

      super.add(message)
    })
  }
}
