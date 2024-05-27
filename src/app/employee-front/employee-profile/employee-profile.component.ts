import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [],
  templateUrl: './employee-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeProfileComponent {}
