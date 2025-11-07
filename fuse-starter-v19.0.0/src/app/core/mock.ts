import { Injectable, InjectionToken } from '@angular/core'
import { of } from 'rxjs'

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL')

@Injectable({
  providedIn: 'root',
})
export class MockClient {
  constructor() {}

  uploadFileToMinIO(path: any, file: any) {
    // NOTE: MOCK DATA
    return of(null)
  }
}
