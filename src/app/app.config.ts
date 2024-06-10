import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  authenticationRedirectInterceptor,
  csrfInterceptor,
} from './global-service/global.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([csrfInterceptor, authenticationRedirectInterceptor]),
    ),
  ],
};
