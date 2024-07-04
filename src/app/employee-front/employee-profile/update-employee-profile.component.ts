import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal
} from '@angular/core';
import { GeneralInformationFormComponent } from '@/app/employee-front/employee-profile/general-information-form.component';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { UpdateProfileDto } from '@/app/employee-front/employee-profile/employee-profile.util';
import { EmployeeProfileService } from '@/app/employee-front/employee-profile/employee-profile.service';

@Component({
  selector: 'app-update-employee-profile',
  standalone: true,
  imports: [GeneralInformationFormComponent, AsyncPipe],
  template: `
    <div class="w-full">
      <app-general-information-form
        [form]="form"
        [employeeId]="user()?.user_id || ''"
        [email]="user()?.email || ''"
        [roles]="user()?.roles || []"
        [updateProfileStatus]="(updateProfileStatus$ | async) || false"
        (updateProfileEmitter)="onUpdateProfileEmitter($event)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateEmployeeProfileComponent {
  protected readonly form: FormGroup;
  protected readonly user: WritableSignal<UserDto | undefined>;

  protected readonly updateProfileStatus$ =
    this.profileService.updateProfileStatus$;

  protected readonly onUpdateProfileEmitter = (dto: UpdateProfileDto) =>
    this.profileService.updateUserProfile(dto);

  constructor(
    private readonly profileService: EmployeeProfileService,
    private readonly fb: FormBuilder
  ) {
    this.user = this.profileService.user;
    const user = this.user();

    this.form = this.fb.group({
      fullname: new FormControl(user?.name, [
        Validators.required,
        Validators.max(150)
      ]),
      name: new FormControl(user?.display_name, [
        Validators.required,
        Validators.max(50)
      ]),
      bio: new FormControl(user?.bio, [
        Validators.required,
        Validators.max(255)
      ])
    });
  }
}
