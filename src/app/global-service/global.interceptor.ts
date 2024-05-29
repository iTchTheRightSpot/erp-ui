import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenExtractor = inject(HttpXsrfTokenExtractor);

  const headerName = 'X-XSRF-TOKEN';
  const token: string | null = tokenExtractor.getToken();

  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({ headers: req.headers.set(headerName, token) });
  }
  return next(req);
};

interface ExceptionResponse {
  message: string;
  redirect_url: string;
  status: number;
}

export function authenticationRedirectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        const error = err.error ? err.error : undefined;

        if (error && error.status === 401) {
          window.location.href = err.error.redirect_url;
        }

        if (error) {
          return throwError(
            () =>
              ({
                message: err.error.message,
                redirect_url: err.error.redirect_url,
                status: err.error.status,
              }) as ExceptionResponse,
          );
        }
      }

      return throwError(() => err);
    }),
  );
}
