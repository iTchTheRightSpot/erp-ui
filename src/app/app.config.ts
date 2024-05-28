import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { csrfInterceptor } from './global-service/csrf.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authenticationRedirectInterceptor } from '@/app/global-service/authentication-redirect.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authenticationRedirectInterceptor, csrfInterceptor]),
    ),
    provideAnimations(),
  ],
};
