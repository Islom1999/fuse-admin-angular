import { TranslocoService } from '@ngneat/transloco'
import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core'
// !IF THIS APPROACH IS NOT GOOD YOU CAN REWRITE FORM-FIELD-WRAPPER AGAIN. AND YOU CAN USE transloco strightforward
// https://formly.dev/docs/examples/advanced/i18n-alternative/
export class TranslateExtension implements FormlyExtension {
  constructor(private translate: TranslocoService) {}
  prePopulate(field: FormlyFieldConfig) {
    const props = field.props || {}
    if (!(props['translate'] || props['translateSelectOptions']) || props['_translated']) {
      return
    }
    props['_translated'] = true

    if (props['translateSelectOptions'] && props.options && Array.isArray(props.options)) {
      props.options = props.options.map((w) => ({
        value: w.value,
        label: this.translate.translate(w.label),
      }))
    }

    field.expressions = {
      ...(field.expressions || {}),
      'props.label': this.translate.selectTranslate(props.label || ''),
      'props.placeholder': this.translate.selectTranslate(props.placeholder || ''),
    }
  }
}
export function registerTranslateExtension(translate: TranslocoService) {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
          return translate.translate('form.validation.required')
        },
      },
    ],
    extensions: [{ name: 'translate', extension: new TranslateExtension(translate) }],
  }
}
