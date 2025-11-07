import type { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Constants } from '../utils/constants';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
    const newReq = req.clone({
        headers: req.headers.set(
            'Accept-Language',
            Constants.HeaderLanguage[StorageService.currentLanguage]
        )
    });

    return next(newReq);
};
