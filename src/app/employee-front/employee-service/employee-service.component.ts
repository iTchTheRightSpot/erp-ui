import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-service',
  standalone: true,
  imports: [],
  templateUrl: './employee-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeServiceComponent {}
