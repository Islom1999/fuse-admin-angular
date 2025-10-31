import { inject, Injectable } from '@angular/core';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { merge } from 'lodash-es';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({providedIn: 'root'})
export class FuseConfirmationService
{
    private _dialogService: DialogService = inject(DialogService);
    private _defaultConfig: FuseConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel : {
                show : true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: FuseConfirmationConfig = {}): DynamicDialogRef
    {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._dialogService.open(FuseConfirmationDialogComponent, {
            data           : userConfig,
            closable       : userConfig.dismissible,
            dismissableMask: userConfig.dismissible,
            modal          : true,
            width          : '420px',
            styleClass     : 'fuse-confirmation-dialog-panel',
            showHeader     : false,
            closeOnEscape : userConfig.dismissible,
        });
    }
}
