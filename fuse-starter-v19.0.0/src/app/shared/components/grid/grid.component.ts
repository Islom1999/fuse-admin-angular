import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core'
import { CommonModule, NgTemplateOutlet } from '@angular/common'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import { GridService } from './common/grid.service'
import { IColumn } from './common/column.model'
import { WrapperBasicComponent } from '../wrapper-basic/wrapper-basic.component'
import { TranslocoPipe } from '@ngneat/transloco'

// PrimeNG imports
import { TableModule, Table } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { SelectModule } from 'primeng/select'
import { PaginatorModule } from 'primeng/paginator'
import { SkeletonModule } from 'primeng/skeleton'
import { SelectButtonModule } from 'primeng/selectbutton'

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WrapperBasicComponent,
    NgTemplateOutlet,
    TranslocoPipe,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    SelectButtonModule,
    PaginatorModule,
    SkeletonModule,
  ],
  templateUrl: './grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    ::ng-deep .p-datatable {
      .p-datatable-header {
        background: transparent;
        border: none;
        padding: 1rem;
      }

      .p-datatable-thead > tr > th {
        background-color: #f9fafb;
        color: #374151;
        font-weight: 600;
        border-bottom: 2px solid #e5e7eb;
        padding: 1rem;
      }

      .p-datatable-tbody > tr {
        transition: all 0.2s ease;

        &:hover {
          background-color: #eff6ff !important;
        }

        > td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f3f4f6;
        }
      }

      .p-paginator {
        background: transparent;
        border-top: 1px solid #e5e7eb;
        padding: 1rem;
        border-radius: 0 0 0.75rem 0.75rem;
      }
    }
  `,
})
export class GridComponent<T> implements AfterViewInit, OnChanges, OnDestroy {
  @Input() titleTemplate?: TemplateRef<any>
  @Input() templateFilters?: TemplateRef<any>
  @Input() templateCostumFields?: TemplateRef<any>

  @Input() title: string | TemplateRef<any>
  @Input() columns: IColumn[] = []
  @Input() selectionMode: 'single' | 'multiple' = 'single'
  @Input() addButtonText = "Qo'shish"
  @Input() addButtonIcon?: string
  @Input() showAddButton = true
  @Input() showExportButton = false
  @Input() showExportButtons = false
  @Input() showArchiveSplitButton = false
  @Input({ required: true }) $data!: GridService<T>

  @Output() onClickAdd = new EventEmitter<void>()
  @Output() onRowSelect = new EventEmitter<T>()

  @ViewChild('dt') table?: Table
  @ContentChild('costumTableFilter', { static: false })
  customTableFilterTemplate?: TemplateRef<unknown>

  dataSource: T[] = []
  sortField?: string
  sortOrder: number = 1
  isLoading = false

  private readonly fb = inject(FormBuilder)
  private readonly destroyRef = inject(DestroyRef)
  private readonly cdr = inject(ChangeDetectorRef)

  filterForm: FormGroup = this.fb.group({})
  filterableColumns: IColumn[] = []
  private filterChangesSub?: Subscription

  constructor() {
    effect(() => {
      if (this.$data) {
        this.dataSource = this.$data.data()
        this.isLoading = this.$data.isLoading()
        this.cdr.markForCheck()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.filterableColumns = (this.columns || []).filter(
        (column) => column.is_filter === true && !!column.field,
      )
      this.buildFilterForm()
    }
  }

  ngAfterViewInit(): void {
    this.$data.onLoadPage({
      pageIndex: this.$data.pageEvent.pageIndex,
      pageSize: this.$data.pageEvent.pageSize,
      length: this.$data.totalRecords(),
    })
  }

  onPageChange(event: any): void {
    // PrimeNG onLazyLoad event.first ni beradi (offset), event.page emas
    // first = pageIndex * pageSize
    const pageIndex = Math.floor(event.first / event.rows)

    this.$data.onLoadPage({
      pageIndex: pageIndex,
      pageSize: event.rows,
      length: this.$data.totalRecords(),
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    })
  }

  onSort(event: any): void {
    this.$data.onLoadPage({
      sortField: event.field,
      sortOrder: event.order,
    })
  }

  ngOnDestroy(): void {
    this.filterChangesSub?.unsubscribe()
  }

  get displayedColumns(): string[] {
    return this.columns.map((column) => column.field)
  }

  get hasActiveFilters(): boolean {
    if (!this.filterableColumns.length) {
      return false
    }

    const activeFilters = this.$data.filterSort.filters || {}
    return this.filterableColumns.some((column) => {
      const value = activeFilters[column.field]
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== undefined && value !== null && value !== ''
    })
  }

  handleRowClick(row: T): void {
    this.onRowSelect.emit(row)
  }

  exportToExcel(): void {
    // Export logic if needed
  }

  isTemplateRef(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef
  }

  getFilterLabel(column: IColumn): string {
    return column.filterPlaceholder || column.header || column.field
  }

  clearSingleFilter(field: string): void {
    const control = this.filterForm.get(field) as FormControl | null
    if (!control) {
      return
    }
    if (control.value === '' || control.value === undefined || control.value === null) {
      return
    }
    control.setValue('', { emitEvent: true })
  }

  resetFilters(): void {
    if (!this.filterableColumns.length) {
      return
    }

    const resetPayload: Record<string, any> = {}
    this.filterableColumns.forEach((column) => {
      resetPayload[column.field] = ''
    })

    this.filterForm.patchValue(resetPayload, { emitEvent: false })
    this.$data.clearFilters()
  }

  private buildFilterForm(): void {
    this.filterChangesSub?.unsubscribe()

    if (!this.filterableColumns.length) {
      this.filterForm = this.fb.group({})
      return
    }

    const controls: Record<string, FormControl<any>> = {}
    const activeFilters = this.$data.filterSort.filters || {}

    this.filterableColumns.forEach((column) => {
      const initialValue = activeFilters[column.field]?.['value'] ?? ''
      controls[column.field] = this.fb.control(initialValue)
    })

    this.filterForm = this.fb.group(controls)

    this.filterChangesSub = this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.$data.applyFilters(value))
  }

  onArchiveViewChange(event: any): void {
    this.$data.isArchiveView.set(event.value)
    console.log(event)
    this.$data.onLoadPage({
      pageIndex: 0,
      pageSize: this.$data.pageEvent.pageSize,
      length: this.$data.totalRecords(),
    })
  }
}
