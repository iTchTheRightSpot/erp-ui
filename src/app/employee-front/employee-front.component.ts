import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeNavigationComponent } from '@/app/employee-front/employee-navigation/employee-navigation.component';

@Component({
  selector: 'app-employee-front',
  standalone: true,
  imports: [RouterOutlet, EmployeeNavigationComponent],
  template: `
    <div class="flex">
      <div>
        <app-employee-navigation />
      </div>

      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFrontComponent {}
