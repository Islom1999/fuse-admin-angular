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
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FuseIconComponent } from '@fuse/components/icon';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        RouterLink,
        NgIf,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        ProgressSpinnerModule,
        FuseIconComponent,
    ],
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;
    hidePassword: boolean = true;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: [''],
            agreements: [false, Validators.requiredTrue],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            this.signUpForm.markAllAsTouched();
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            () =>
            {
                // Navigate to the confirmation required page
                this._router.navigateByUrl('/confirmation-required');
            },
            (response) =>
            {
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpNgForm.resetForm({
                    name      : '',
                    email     : '',
                    password  : '',
                    company   : '',
                    agreements: false,
                });
                this.signUpForm.reset({
                    name      : '',
                    email     : '',
                    password  : '',
                    company   : '',
                    agreements: false,
                });

                // Reset password visibility
                this.hidePassword = true;

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Something went wrong, please try again.',
                };

                // Show the alert
                this.showAlert = true;
            },
        );
    }
}
