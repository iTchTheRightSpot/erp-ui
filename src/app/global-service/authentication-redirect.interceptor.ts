import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

export function authenticationRedirectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        const redirect = err.error && err.error.redirect_url ? err.error.redirect_url : undefined;
        if (err.status === 401 && redirect) {
          window.location.href = redirect;
        }
      }
      return of(err);
    }),
  );
}
