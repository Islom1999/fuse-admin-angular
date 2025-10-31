import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FuseIconComponent } from '@fuse/components/icon';

@Component({
    selector: 'auth-unlock-session',
    templateUrl: './unlock-session.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        NgIf,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        RouterLink,
        FuseIconComponent,
    ],
})
export class AuthUnlockSessionComponent implements OnInit {
    @ViewChild('unlockSessionNgForm') unlockSessionNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    name: string;
    showAlert: boolean = false;
    unlockSessionForm: UntypedFormGroup;
    private _email: string;
    hidePassword: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the user's name
        this._userService.user$.subscribe((user) => {
            this.name = user.name;
            this._email = user.email;
        });

        // Create the form
        this.unlockSessionForm = this._formBuilder.group({
            name: [
                {
                    value: this.name,
                    disabled: true,
                },
            ],
            password: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Unlock
     */
    unlock(): void {
        // Return if the form is invalid
        if (this.unlockSessionForm.invalid) {
            this.unlockSessionForm.markAllAsTouched();
            return;
        }

        // Disable the form
        this.unlockSessionForm.disable();

        // Hide the alert
        this.showAlert = false;

        this._authService
            .unlockSession({
                email   : this._email ?? '',
                password: this.unlockSessionForm.get('password').value,
            })
            .subscribe(
                () =>
                {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL =
                        this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                },
                () =>
                {
                    // Re-enable the form
                    this.unlockSessionForm.enable();

                    // Reset the form
                    this.unlockSessionNgForm.resetForm({
                        name: {
                            value   : this.name,
                            disabled: true,
                        },
                    });
                    this.unlockSessionForm.reset({
                        name    : this.name,
                        password: '',
                    });
                    this.unlockSessionForm.get('name').disable();

                    // Reset password visibility
                    this.hidePassword = true;

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Invalid password',
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );
    }
}
