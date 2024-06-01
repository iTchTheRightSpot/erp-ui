import { inject } from '@angular/core';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { environment } from '@/environments/environment';
import { map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Role, STORE_FRONT_HOME } from '@/app/app.util';

export const employeeFrontGuard = () => {
  const service = inject(AuthenticationService);
  const router = inject(Router);
  const production = environment.production;

  return production
    ? service.activeStaff$.pipe(
        map(
          (obj) =>
            obj.role === Role.EMPLOYEE ||
            obj.role === Role.OWNER ||
            obj.role === Role.DEVELOPER,
        ),
        tap((bool: boolean) => {
          if (!bool) {
            router.navigate([STORE_FRONT_HOME]);
          }
        }),
      )
    : of(true);
};
