import { inject } from '@angular/core';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UNAUTHORIZED } from '@/app/app.util';

export const employeeRouteGuard = () => {
  const service = inject(AuthenticationService);
  const router = inject(Router);
  return service.isStaff().pipe(
    tap((bool) => {
      if (!bool) router.navigate([`${UNAUTHORIZED}`]);
    }),
  );
};
