import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Role } from '@/app/app.util';
import { UpdateProfileDto } from '@/app/employee-front/employee-profile/general-information-form/general-information.util';

@Component({
  selector: 'app-general-information-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './general-information-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInformationFormComponent {
  form = input.required<FormGroup>();
  employeeId = input.required<string>();
  email = input.required<string>();
  roles = input.required<Role[]>();
  updateProfileStatus = input.required<boolean>();

  readonly updateProfileEmitter = output<UpdateProfileDto>();

  private readonly buildForm = () => {
    const form = this.form();
    const fullname = form.controls['fullname'].value;
    const name = form.controls['name'].value;
    const bio = form.controls['bio'].value;

    return {
      user_id: this.employeeId(),
      name: fullname ? fullname : '',
      display_name: name ? name : '',
      bio: bio ? bio : '',
    } as UpdateProfileDto;
  };

  protected readonly submit = () =>
    this.updateProfileEmitter.emit(this.buildForm());
}
