import { InjectionToken } from '@angular/core'

export class DITokens {
  static readonly API_BASE_URL = new InjectionToken<string>('API_BASE_URL')
}
