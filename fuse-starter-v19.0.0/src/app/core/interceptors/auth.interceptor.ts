import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { AuthUtils } from '../auth/auth.utils'
import { StorageService } from '../services/storage.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authReq = req
  const token = StorageService.accessToken
  const $auth = inject(AuthService)

  if (token && !AuthUtils.isTokenExpired(token)) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        $auth.signOut()
      }
      return throwError(() => error)
    }),
  )
}
