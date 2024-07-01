import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general-information-form',
  standalone: true,
  imports: [],
  templateUrl: './general-information-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInformationFormComponent {}
