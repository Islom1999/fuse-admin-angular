import { Component, ChangeDetectionStrategy, Type } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field'
import { InputNumberModule } from 'primeng/inputnumber'

interface InputNumberProps extends FormlyFieldProps {
  currency?: string
  locale?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mode?: any
  useGrouping?: boolean
}

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<InputNumberProps> {
  type: 'input-number' | Type<TypeInputNumber>
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-inputnumber',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, FormlyModule],
  template: `
    <p-inputnumber
      [formControl]="formControl"
      [formlyAttributes]="field"
      [mode]="props.mode"
      [currency]="props.currency"
      [locale]="props.locale"
      [placeholder]="props.placeholder"
      [useGrouping]="props.useGrouping"
      fluid
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeInputNumber extends FieldType<FieldTypeConfig<InputNumberProps>> {
  override defaultOptions?: Partial<FieldTypeConfig<InputNumberProps>> = {
    props: {
      useGrouping: true,
    },
  }
}
