import { Component, ChangeDetectionStrategy, Type } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field'
import { TextareaModule } from 'primeng/textarea'

type TextAreaProps = FormlyFieldProps

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<TextAreaProps> {
  type: 'textarea' | Type<TypeTextArea>
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaModule, FormlyModule],
  template: `
    <textarea
      [formControl]="formControl"
      [formlyAttributes]="field"
      [rows]="props.rows"
      [cols]="props.cols"
      pTextarea
      fluid
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeTextArea extends FieldType<FieldTypeConfig<TextAreaProps>> {}
