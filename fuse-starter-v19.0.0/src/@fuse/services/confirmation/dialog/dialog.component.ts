import { NgClass, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FuseIconComponent } from '@fuse/components/icon';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .p-dialog-content {
                    padding: 0 !important;
                }

                .p-dialog-header {
                    display: none !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, ButtonModule, NgClass, FuseIconComponent],
})
export class FuseConfirmationDialogComponent {
    data: FuseConfirmationConfig;

    /**
     * Constructor
     */
    constructor(
        private _dialogRef: DynamicDialogRef,
        private _dialogConfig: DynamicDialogConfig
    ) {
        this.data = this._dialogConfig.data as FuseConfirmationConfig;
    }

    get confirmSeverity(): string | undefined {
        const color = this.data?.actions?.confirm?.color;
        switch (color) {
            case 'primary':
                return 'primary';
            case 'accent':
                return 'secondary';
            case 'warn':
            // case 'warning':
            //     return 'warning';
            // case 'success':
            //     return 'success';
            // case 'error':
            //     return 'danger';
            default:
                return undefined;
        }
    }

    close(result?: 'confirmed' | 'cancelled'): void {
        this._dialogRef.close(result);
    }
}
