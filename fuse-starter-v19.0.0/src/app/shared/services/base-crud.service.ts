import { inject, Injectable } from '@angular/core'
import { IPagination } from 'app/core/services/base.model'
import { BaseApiService } from 'app/core/services/base.service'
import { Observable } from 'rxjs'

export interface TableFilterRule {
  value: string | number | boolean | null
  matchMode: 'contains' | 'equals' | 'startsWith' | 'endsWith'
}
export class TableQueryDTO {
  first?: number
  rows?: number
  sortField?: string
  sortOrder?: 1 | -1
  filters?: Record<string, any>
  globalFilter?: string | null
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseCrudService<T> {
  public baseApi = inject(BaseApiService)

  constructor(
    // protected baseApi: BaseApiService,
    public endpoint: string, // <-- dinamik endpoint
  ) {}

  getAll(): Observable<T[]> {
    return this.baseApi.get<T[]>(`${this.endpoint}`)
  }

  getAllPagination(params: TableQueryDTO, isArchiveView: boolean): Observable<IPagination<T>> {
    const url = `${this.endpoint}/pagination` + (isArchiveView ? '/archive' : '')
    return this.baseApi.post<IPagination<T>>(url, { ...params })
  }

  getById(id: string, isArchiveView: boolean = false): Observable<T> {
    const url = `${this.endpoint}` + (isArchiveView ? '/archive' : '')
    return this.baseApi.get<T>(`${url}/${id}`)
  }

  create(data: Partial<T>): Observable<T> {
    return this.baseApi.post<T>(`${this.endpoint}`, data)
  }

  update(id: string, data: Partial<T>): Observable<T> {
    return this.baseApi.put<T>(`${this.endpoint}/${id}`, data)
  }

  delete(id: string): Observable<T> {
    return this.baseApi.delete<T>(`${this.endpoint}/${id}`)
  }

  repair(id: string): Observable<T> {
    return this.baseApi.get<T>(`${this.endpoint}/repair/${id}`)
  }
}
