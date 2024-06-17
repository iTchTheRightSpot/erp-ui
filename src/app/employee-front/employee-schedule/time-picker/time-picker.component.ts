import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { User } from '@/app/employee-front/user/user.util';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, DatePipe, NgStyle],
  styleUrl: '../../../shared-components/number-input.component.css',
  templateUrl: './time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent {
  form = input.required<FormGroup>();
  selected = input.required<Date>();
  readonly submitEmitter = output<{ start: Date; end: Date }>();

  private readonly buildForm = () => {
    const date = this.selected();
    const start = this.form().controls['start'].value;
    const end = this.form().controls['end'].value;

    const [startHrs, startMins] = (start ? start : '00:00')
      .split(':')
      .map(Number);
    const [endHrs, endMins] = (end ? end : '00:00').split(':').map(Number);

    return {
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        startHrs,
        startMins,
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        endHrs,
        endMins,
      ),
    };
  };

  protected readonly onEndTimeNotAfterStart = () => {
    const build = this.buildForm();
    return build.start >= build.end;
  };

  protected readonly submit = () => this.submitEmitter.emit(this.buildForm());
}
