import { Component, ChangeDetectionStrategy, Type } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete'

interface AutocompleteProps extends FormlyFieldProps {
  items: string[]
  appendTo: 'body' | null
}

export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<AutocompleteProps> {
  type: 'autocomplete' | Type<TypeAutocomplete>
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule, AutoComplete, FormlyModule],
  template: `
    <p-autocomplete
      [formControl]="formControl"
      [formlyAttributes]="field"
      [suggestions]="suggestions"
      (completeMethod)="search($event)"
      [appendTo]="props.appendTo"
      [placeholder]="props.placeholder"
      fluid
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeAutocomplete extends FieldType<FieldTypeConfig<AutocompleteProps>> {
  suggestions = this.props.items ? [...this.props.items] : []
  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = this.props.items.filter((item) => item.includes(event.query))
  }
}
