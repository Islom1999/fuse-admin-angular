import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core'
import { FormlyPrimeNGModule } from '@ngx-formly/primeng'
import { ButtonModule } from 'primeng/button'
import { TranslocoPipe } from '@ngneat/transloco'
import { ITableFilterConfig, convertToFormlyFields } from './table-filter.model'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, ButtonModule, TranslocoPipe],
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent implements OnInit {
  @Input() config!: ITableFilterConfig
  @Input() debounceTime = 500
  @Output() filterChange = new EventEmitter<any>()
  @Output() filterReset = new EventEmitter<void>()

  form = new FormGroup({})
  model: any = {}
  fields: FormlyFieldConfig[] = []
  isExpanded = false

  ngOnInit(): void {
    if (!this.config || !this.config.fields) {
      console.warn('TableFilterComponent: config or fields not provided')
      return
    }

    this.initializeFilter()
    this.setupFormValueChanges()
  }

  private initializeFilter(): void {
    // Convert IFilterField to FormlyFieldConfig
    this.fields = convertToFormlyFields(this.config.fields)

    // Set initial model values
    this.model = this.config.fields.reduce((acc, field) => {
      acc[field.key] = field.defaultValue ?? null
      return acc
    }, {} as any)
  }

  private setupFormValueChanges(): void {
    this.form.valueChanges.pipe(debounceTime(this.debounceTime)).subscribe((values) => {
      // Remove null, undefined, empty string values
      const cleanedValues = this.cleanFilterValues(values)
      this.filterChange.emit(cleanedValues)
    })
  }

  private cleanFilterValues(values: any): any {
    const cleaned: any = {}
    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (value !== null && value !== undefined && value !== '') {
        // For arrays (multiselect), check if not empty
        if (Array.isArray(value) && value.length === 0) {
          return
        }
        cleaned[key] = value
      }
    })
    return cleaned
  }

  toggleFilter(): void {
    this.isExpanded = !this.isExpanded
  }

  onReset(): void {
    // Reset form to initial state
    this.form.reset()
    this.model = {}
    this.filterReset.emit()
    this.filterChange.emit({})
  }

  get hasActiveFilters(): boolean {
    const values = this.form.value
    return Object.keys(values).some((key) => {
      const value = values[key]
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null && value !== undefined && value !== ''
    })
  }

  getActiveFiltersCount(): number {
    const values = this.form.value
    return Object.keys(values).filter((key) => {
      const value = values[key]
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null && value !== undefined && value !== ''
    }).length
  }

  get gridClass(): string {
    const columns = this.config.columns || 3
    return `grid gap-3 md:grid-cols-2 lg:grid-cols-${columns}`
  }
}
