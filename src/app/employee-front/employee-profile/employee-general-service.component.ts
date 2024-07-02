import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-general-service',
  standalone: true,
  imports: [],
  template: `
    <div class="text-gray-900 dark:text-white">
      employee general service component works
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeGeneralServiceComponent {}
