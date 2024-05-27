import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-employee-schedule',
  standalone: true,
  imports: [
    CalendarComponent,
    ReactiveFormsModule,
    TimePickerComponent,
    NgStyle,
  ],
  templateUrl: './employee-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeScheduleComponent {
  private readonly fb = inject(FormBuilder);

  protected selected = new Date();
  protected toggle = false;

  protected readonly form = this.fb.group({
    start: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
  });

  protected readonly onSchedule = (event: {
    start: Date;
    duration: number;
  }) => {
    console.log('on event ', event);
  };

  protected readonly onDateSelected = (selected: Date) =>
    (this.selected = selected);
}
