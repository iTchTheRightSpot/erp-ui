import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  authenticationRedirectInterceptor,
  csrfInterceptor,
} from './global-service/global.interceptor';
import { CacheService } from '@/app/global-service/cache.service';
import { SHIFTS_BY_MONTH_YEAR } from '@/app/employee-front/employee-schedule/schedule.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([csrfInterceptor, authenticationRedirectInterceptor]),
    ),
    {
      provide: SHIFTS_BY_MONTH_YEAR,
      useClass: CacheService,
    },
  ],
};
