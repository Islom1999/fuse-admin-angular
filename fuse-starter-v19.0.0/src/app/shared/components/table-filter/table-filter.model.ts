import { FormlyFieldConfig } from '@ngx-formly/core'

export interface IFilterField {
  key: string
  type: 'input' | 'select' | 'date' | 'number' | 'checkbox' | 'multiselect'
  label: string
  placeholder?: string
  options?: { label: string; value: any }[]
  className?: string
  defaultValue?: any
  props?: any
}

export interface ITableFilterConfig {
  fields: IFilterField[]
  showResetButton?: boolean
  resetButtonLabel?: string
  columns?: number // Grid columns (1, 2, 3, 4)
}

export function convertToFormlyFields(fields: IFilterField[]): FormlyFieldConfig[] {
  return fields.map((field) => {
    const formlyField: FormlyFieldConfig = {
      key: field.key,
      type: getFormlyType(field.type),
      className: field.className || 'col-12 md:col-6 lg:col-4',
      defaultValue: field.defaultValue,
      props: {
        label: field.label,
        placeholder: field.placeholder || field.label,
        required: false,
        ...field.props,
      },
    }

    // Add options for select/multiselect
    if (field.type === 'select' || field.type === 'multiselect') {
      formlyField.props = {
        ...formlyField.props,
        options: field.options || [],
        showClear: true,
        filter: true, // Enable search
        optionLabel: 'label',
        optionValue: 'value',
        multiple: field.type === 'multiselect', // Enable multiple selection
      }
    }

    // Add specific props for input
    if (field.type === 'input') {
      formlyField.props = {
        ...formlyField.props,
        type: 'text',
      }
    }

    // Add specific props for date (calendar in PrimeNG)
    if (field.type === 'date') {
      formlyField.props = {
        ...formlyField.props,
        showIcon: true,
        dateFormat: 'dd/mm/yy',
        showButtonBar: true,
      }
    }

    // Add specific props for number
    if (field.type === 'number') {
      formlyField.props = {
        ...formlyField.props,
        type: 'number',
      }
    }

    return formlyField
  })
}

function getFormlyType(type: IFilterField['type']): string {
  const typeMap: Record<IFilterField['type'], string> = {
    input: 'input',
    select: 'select',
    date: 'datepicker',
    number: 'input',
    checkbox: 'checkbox',
    multiselect: 'select', // Use select with multiple=true
  }
  return typeMap[type] || 'input'
}
