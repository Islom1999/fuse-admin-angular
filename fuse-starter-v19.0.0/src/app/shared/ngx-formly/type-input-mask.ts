import { Component, ChangeDetectionStrategy, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FieldType,
    FieldTypeConfig,
    FormlyFieldConfig,
    FormlyModule
} from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/primeng/form-field';
import { InputMaskModule } from 'primeng/inputmask';

interface InputMaskProps extends FormlyFieldProps {
    mask: string;
    unmask: boolean;
}

export interface FormlyTextAreaFieldConfig
    extends FormlyFieldConfig<InputMaskProps> {
    type: 'input-mask' | Type<TypeInputMask>;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'type-inputmask',
    standalone: true,
    imports: [ReactiveFormsModule, InputMaskModule, FormlyModule],
    template: `
        <p-inputmask
            [formControl]="formControl"
            [formlyAttributes]="field"
            [mask]="props.mask"
            [placeholder]="props.placeholder"
            [unmask]="props.unmask"
            fluid
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeInputMask extends FieldType<FieldTypeConfig<InputMaskProps>> {}
