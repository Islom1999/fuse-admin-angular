import { AsyncPipe } from '@angular/common'
import { Component, ChangeDetectionStrategy, Type } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyFieldSelectProps, FormlySelectModule } from '@ngx-formly/core/select'
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field'
import { MultiSelectModule } from 'primeng/multiselect'
import { Select } from 'primeng/select'

interface SelectProps extends FormlyFieldProps, FormlyFieldSelectProps {
  appendTo?: Select['appendTo']
  filter?: boolean
  filterBy?: string
}

export interface FormlySelectFieldConfig extends FormlyFieldConfig<SelectProps> {
  type: 'multiselect' | Type<TypeMultiSelect>
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-multiselect',
  standalone: true,
  imports: [ReactiveFormsModule, MultiSelectModule, FormlyModule, FormlySelectModule, AsyncPipe],
  template: `
    <p-multiselect
      [placeholder]="props.placeholder"
      [options]="(props.options | formlySelectOptions: field | async) || []"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [showClear]="!props.required"
      [appendTo]="props.appendTo"
      [filter]="props.filter"
      [filterBy]="props.filterBy ?? 'label'"
      [optionLabel]="'label'"
      [optionValue]="'value'"
      (onChange)="props.change && props.change(field, $event)"
      [maxSelectedLabels]="3"
      fluid
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeMultiSelect extends FieldType<FieldTypeConfig<SelectProps>> {}
