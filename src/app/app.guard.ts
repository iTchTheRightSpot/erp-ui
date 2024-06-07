import { inject } from '@angular/core';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { STORE_FRONT_HOME } from '@/app/app.util';

export const employeeRouteGuard = () => {
  const router = inject(Router);
  return inject(AuthenticationService)
    .isStaff()
    .pipe(
      tap((bool) => {
        if (!bool) router.navigate([`${STORE_FRONT_HOME}`]);
      }),
    );
};
