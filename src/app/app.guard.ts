import { inject } from '@angular/core';
import { AuthenticationService } from '@/app/global-service/authentication.service';

export const employeeRouteGuard = () => inject(AuthenticationService).isStaff();
