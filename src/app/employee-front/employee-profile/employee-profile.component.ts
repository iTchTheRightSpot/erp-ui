import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
} from '@angular/core';
import { GeneralInformationFormComponent } from '@/app/employee-front/employee-profile/general-information-form/general-information-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeProfileService } from '@/app/employee-front/employee-profile/employee-profile.service';
import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { AsyncPipe } from '@angular/common';
import {
  UpdateProfileDto
} from "@/app/employee-front/employee-profile/general-information-form/general-information.util";

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [GeneralInformationFormComponent, AsyncPipe],
  templateUrl: './employee-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeProfileComponent {
  protected readonly form: FormGroup;
  protected readonly user: WritableSignal<UserDto | undefined>;

  protected readonly updateProfileStatus$ =
    this.profileService.updateProfileStatus$;

  protected readonly onUpdateProfileEmitter = (dto: UpdateProfileDto) => this.profileService.updateUserProfile(dto);

  constructor(
    private readonly profileService: EmployeeProfileService,
    private readonly fb: FormBuilder,
  ) {
    this.user = this.profileService.user;
    const user = this.user();

    this.form = this.fb.group({
      fullname: new FormControl(user?.name, [
        Validators.required,
        Validators.max(150),
      ]),
      name: new FormControl(user?.display_name, [
        Validators.required,
        Validators.max(50),
      ]),
      bio: new FormControl(user?.bio, [
        Validators.required,
        Validators.max(255),
      ]),
    });
  }


}
