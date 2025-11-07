import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const $message = inject(MessageService);
    return next(req).pipe(
        catchError((error) => {
            const reader: FileReader = new FileReader();
            reader.onloadend = () => {
                const errorParsed =
                    typeof reader.result === 'string'
                        ? JSON.parse(reader.result)
                        : { Title: 'Error', Detail: 'Unexpected error' };
                $message.add({
                    severity: 'error',
                    summary: errorParsed.Title || 'Error',
                    detail:
                        errorParsed.Detail ||
                        errorParsed.detail ||
                        errorParsed.message ||
                        errorParsed ||
                        'Unexpected error',
                    life: 3000
                });
            };

            if (error.error instanceof Blob) reader.readAsText(error.error);
            else {
                $message.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'unexpectedError.retyagain',
                    life: 3000
                });
            }
            return throwError(() => error);
        })
    );
};
