import {
  HttpInterceptorFn,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { inject } from '@angular/core';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenExtractor = inject(HttpXsrfTokenExtractor);

  const headerName = 'X-XSRF-TOKEN';
  const token: string | null = tokenExtractor.getToken();

  if (token !== null && !req.headers.has(headerName)) {
    req = req.clone({ headers: req.headers.set(headerName, token) });
  }
  return next(req);
};
