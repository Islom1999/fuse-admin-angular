import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { DITokens } from '../utils/di-tokens'

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(
    private http: HttpClient,
    @Inject(DITokens.API_BASE_URL) public apiBaseUrl: string,
  ) {}

  get<T>(
    path: string,
    obj?: {
      queryParams?: any
      params?: HttpParams
      responseType?: 'json'
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[]
          }
    },
  ) {
    const params = obj?.params ? obj.params : new HttpParams({ fromObject: obj?.queryParams })
    return this.http.get<T>(`${this.apiBaseUrl}/${path}`, {
      params,
      headers: obj?.headers,
      responseType: obj?.responseType,
    })
  }

  post<T>(
    path: string,
    body: any,
    options?: {
      queryParams?: any
      params?: HttpParams
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[]
          }
    },
  ) {
    const params = options?.params
      ? options.params
      : new HttpParams({ fromObject: options?.queryParams })
    return this.http.post<T>(`${this.apiBaseUrl}/${path}`, body, {
      params,
      headers: options?.headers,
    })
  }

  put<T>(
    path: string,
    body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[]
          }
    },
  ) {
    return this.http.put<T>(`${this.apiBaseUrl}/${path}`, body, options)
  }

  delete<T>(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[]
          }
    },
  ) {
    return this.http.delete<T>(`${this.apiBaseUrl}/${path}`, options)
  }
}
