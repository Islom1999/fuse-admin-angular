import { ChangeDetectionStrategy, Component, Type } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field'
import { DatePickerModule } from 'primeng/datepicker'

interface DatepickerProps extends FormlyFieldProps {
  // defaultDate: Date;
  dateFormat?: string
  // hourFormat: string;
  showTime: boolean
  showIcon?: boolean
  showButtonBar?: boolean
  showOtherMonths?: boolean
  selectOtherMonths?: boolean
  selectionMode?: 'multiple' | 'single' | 'range'
  numberOfMonths: number
  inline?: boolean
  readonlyInput?: boolean
  touchUI?: boolean
  monthNavigator?: boolean
  yearNavigator?: boolean
  timeOnly?: boolean
  appendTo?: 'body' | unknown
  // yearRange: string;
}

export interface FormlyDatepickerFieldConfig extends FormlyFieldConfig<DatepickerProps> {
  type: 'datepicker' | Type<TypeDatepicker>
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-datepicker',
  imports: [DatePickerModule, ReactiveFormsModule, FormlyModule],
  template: `
    <p-datepicker
      [dateFormat]="props.dateFormat"
      [showIcon]="props.showIcon"
      [showButtonBar]="props.showButtonBar"
      [showOtherMonths]="props.showOtherMonths"
      [selectOtherMonths]="props.selectOtherMonths"
      [selectionMode]="props.selectionMode || 'single'"
      [numberOfMonths]="props.numberOfMonths"
      [inline]="props.inline"
      [readonlyInput]="props.readonlyInput"
      [touchUI]="props.touchUI"
      [placeholder]="props.placeholder"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [showTime]="props.showTime"
      [timeOnly]="props.timeOnly"
      [appendTo]="props.appendTo"
      fluid
    >
    </p-datepicker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeDatepicker extends FieldType<FieldTypeConfig<DatepickerProps>> {
  override defaultOptions?: Partial<FieldTypeConfig<DatepickerProps>> = {
    props: {
      numberOfMonths: 1,
      showTime: false,
      dateFormat: 'dd.mm.yy',
    },
  }
}
