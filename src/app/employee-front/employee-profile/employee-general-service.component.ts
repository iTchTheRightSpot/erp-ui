import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-general-service',
  standalone: true,
  imports: [],
  template: `employee general service component works`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeGeneralServiceComponent {}
