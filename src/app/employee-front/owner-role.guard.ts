import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { EMPLOYEE_FRONT_HOME, Role } from '@/app/app.util';
import { EMPLOYEE_FRONT_SERVICE } from '@/app/employee-front/employee-front.util';
import { EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE } from '@/app/employee-front/employee-service/employee-service.util';

export const ownerRoleGuard = async () => {
  const router = inject(Router);
  const user = inject(AuthenticationService).activeUser();
  const bool = !user
    ? false
    : user.roles.includes(Role.OWNER) || user.roles.includes(Role.DEVELOPER);

  if (!bool)
    await router.navigate([
      `${EMPLOYEE_FRONT_HOME}/${EMPLOYEE_FRONT_SERVICE}/${EMPLOYEE_ALL_SERVICE_OFFERED_ROUTE}`
    ]);

  return bool;
};
