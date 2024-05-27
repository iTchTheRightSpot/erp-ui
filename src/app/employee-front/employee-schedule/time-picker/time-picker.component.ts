import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, DatePipe],
  styleUrl: '../../../global-components/number-input.component.css',
  templateUrl: './time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent {
  form = input.required<FormGroup>();
  selected = input.required<Date>();

  readonly submitEmitter = output<{ start: Date; duration: number }>();

  protected readonly hrs: number[] = Array.from({ length: 24 }, (_, i) => i);

  private readonly buildForm = () => {
    const start = this.form().controls['start'].value;
    const duration = this.form().controls['duration'].value;

    return {
      start: start ? start : new Date(),
      duration: duration ? duration : 0,
    };
  };

  protected readonly submit = () => this.submitEmitter.emit(this.buildForm());
}
