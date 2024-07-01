import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeneralInformationFormComponent } from '@/app/employee-front/employee-service/general-information-form/general-information-form.component';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [GeneralInformationFormComponent],
  templateUrl: './employee-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeProfileComponent {}
