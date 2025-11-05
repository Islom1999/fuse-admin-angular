import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'example',
    standalone: true,
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonModule, InputTextModule, SelectModule],
})
export class ExampleComponent {
    /**
     * Constructor
     */
    constructor() {}
}
