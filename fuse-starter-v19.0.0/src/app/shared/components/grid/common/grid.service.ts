import { inject, Injectable, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { FuseLoadingService } from '@fuse/services/loading'
import { GridResponse } from './grid.model'
import { TableQueryDTO } from 'app/shared/services/base-crud.service'

interface PageEvent {
  pageIndex: number
  pageSize: number
  length: number
  sortField?: string
  sortOrder?: number
}

@Injectable()
export abstract class GridService<T = any> {
  public data = signal<T[]>([])
  public totalRecords = signal(0)
  public isLoading = signal(false)
  public isArchiveView = signal(false)
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  }

  public filterSort: TableQueryDTO = {
    sortField: '',
    sortOrder: 1,
    filters: {},
  }

  protected $route = inject(ActivatedRoute)
  protected $router = inject(Router)
  protected _fuseProgressBarService = inject(FuseLoadingService)

  routes: any[] = []
  params: { [key: string]: any } = {}

  constructor() {
    this.makeFiltersFromQueryParams()
  }

  abstract getAllData(params: TableQueryDTO, isArchiveView: boolean): Observable<GridResponse<T>>

  private makeFiltersFromQueryParams() {
    const queryParams = this.$route.snapshot.queryParams || {}
    const { page, limit, sortOrder, sortField, ...rest } = queryParams

    if (page) {
      const parsedPage = Number(page)
      this.pageEvent.pageIndex = Number.isFinite(parsedPage)
        ? Math.max(parsedPage - 1, 0)
        : this.pageEvent.pageIndex
    }

    if (limit) {
      const parsedLimit = Number(limit)
      this.pageEvent.pageSize = Number.isFinite(parsedLimit)
        ? Math.max(parsedLimit, 1)
        : this.pageEvent.pageSize
    }

    if (typeof sortField === 'string') {
      this.filterSort.sortField = sortField
    }

    if (typeof +sortOrder === 'number') {
      this.filterSort.sortOrder = sortOrder
    }

    this.filterSort.filters = this.sanitizeFilters(rest)
  }

  private sanitizeFilters(filters: Record<string, any> | undefined) {
    if (!filters) return {}

    return Object.entries(filters).reduce<Record<string, any>>((acc, [key, value]) => {
      if (value === undefined || value === null || value === '') {
        return acc
      }

      // Agar value oddiy string bo‘lsa — PrimeNG filter formatiga avtomatik aylantiramiz ✅
      if (typeof value === 'string') {
        acc[key] = { value: value.trim(), matchMode: 'contains' } // default matchMode ✅
        return acc
      }

      // Agar allaqachon PrimeNG formatida bo‘lsa → o‘zgartirmay yuboriladi ✅
      if (value?.value !== undefined && value?.matchMode) {
        acc[key] = value
        return acc
      }

      // Agar oddiy number yoki boolean kelsa ham — object qilib yuboramiz ✅
      acc[key] = { value, matchMode: 'equals' }
      return acc
    }, {})
  }

  private areFiltersEqual(a: Record<string, any>, b: Record<string, any>) {
    const aEntries = Object.entries(a)
    const bEntries = Object.entries(b)
    if (aEntries.length !== bEntries.length) {
      return false
    }

    return aEntries.every(([key, value]) => {
      if (!(key in b)) {
        return false
      }
      const other = b[key]
      return JSON.stringify(value) === JSON.stringify(other)
    })
  }

  onLoadPage(event?: Partial<PageEvent>) {
    if (!event) {
      return
    }

    if ('pageIndex' in event && event.pageIndex !== undefined && event.pageSize !== undefined) {
      this.pageEvent = {
        ...this.pageEvent,
        pageIndex: event.pageIndex,
        pageSize: event.pageSize,
      }
    }

    if ('sortField' in event && event.sortField) {
      this.filterSort.sortField = event.sortField
    }
    if ('sortOrder' in event && event.sortOrder !== undefined) {
      this.filterSort.sortOrder = event.sortOrder as 1 | -1
    }

    this.filterSort.filters = this.sanitizeFilters(this.filterSort.filters)

    const requestParams: TableQueryDTO = {
      first: this.pageEvent.pageIndex * this.pageEvent.pageSize,
      rows: this.pageEvent.pageSize,
      sortField: this.filterSort.sortField,
      sortOrder: this.filterSort.sortOrder,
      filters: this.filterSort.filters,
    }

    if (this.filterSort.sortField) {
      requestParams.sortField = this.filterSort.sortField
    }
    if (this.filterSort.sortOrder) {
      requestParams.sortOrder = this.filterSort.sortOrder
    }

    this._fuseProgressBarService.show()
    this.isLoading.set(true)

    this.getAllData(requestParams, this.isArchiveView()).subscribe({
      next: (res) => {
        const count = Number(res?.count ?? 0)

        if (!res?.data) {
          this.data.set([])
        } else {
          this.data.set(res.data)
        }

        this.totalRecords.set(count)
        this.pageEvent = {
          ...this.pageEvent,
          length: count,
        }

        this._fuseProgressBarService.hide()
        this.isLoading.set(false)
      },
      error: () => {
        this.data.set([])
        const count = 0
        this.totalRecords.set(count)
        this.pageEvent = {
          ...this.pageEvent,
          length: count,
        }
        this.isLoading.set(false)
        this._fuseProgressBarService.hide()
      },
    })

    this.navigateWithFilters()
  }

  applyFilters(filters: Record<string, any>) {
    const sanitized = this.sanitizeFilters(filters)

    // if (this.areFiltersEqual(this.filterSort.filters, sanitized)) {
    //   return
    // }

    this.filterSort.filters = sanitized
    this.pageEvent = {
      ...this.pageEvent,
      pageIndex: 0,
    }
    this.onLoadPage({
      pageIndex: this.pageEvent.pageIndex,
      pageSize: this.pageEvent.pageSize,
      length: this.totalRecords(),
    })
  }

  clearFilters() {
    this.applyFilters({})
  }

  public navigateWithFilters() {
    const queryParams: Record<string, any> = {
      page: this.pageEvent.pageIndex + 1,
      limit: this.pageEvent.pageSize,
    }

    Object.entries(this.filterSort.filters).forEach(([key, filterObj]) => {
      if (filterObj?.value !== undefined && filterObj?.value !== null) {
        queryParams[key] = filterObj.value
      }
    })

    if (this.filterSort.sortField) {
      queryParams.sortField = this.filterSort.sortField
    }

    if (this.filterSort.sortOrder !== undefined && this.filterSort.sortOrder !== null) {
      queryParams.sortOrder = this.filterSort.sortOrder
    }

    this.$router.navigate(this.routes, {
      relativeTo: this.$route,
      queryParams,
    })
  }

  next() {
    this.pageEvent = {
      ...this.pageEvent,
      pageIndex: this.pageEvent.pageIndex + 1,
    }
    this.onLoadPage({
      pageIndex: this.pageEvent.pageIndex,
      pageSize: this.pageEvent.pageSize,
      length: this.totalRecords(),
    })
  }

  prev() {
    this.pageEvent = {
      ...this.pageEvent,
      pageIndex: Math.max(0, this.pageEvent.pageIndex - 1),
    }
    this.onLoadPage({
      pageIndex: this.pageEvent.pageIndex,
      pageSize: this.pageEvent.pageSize,
      length: this.totalRecords(),
    })
  }
}
