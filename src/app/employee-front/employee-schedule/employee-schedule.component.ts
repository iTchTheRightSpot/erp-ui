import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { DatePipe, NgStyle } from '@angular/common';
import { toHrMins } from '@/app/app.util';
import { of } from 'rxjs';

@Component({
  selector: 'app-employee-schedule',
  standalone: true,
  imports: [
    CalendarComponent,
    ReactiveFormsModule,
    TimePickerComponent,
    NgStyle,
    DatePipe,
  ],
  templateUrl: './employee-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeScheduleComponent {
  private readonly fb = inject(FormBuilder);

  protected selected = new Date();
  protected toggle = false;

  private readonly map = new Map<string, { start: Date; duration: number }>();

  protected readonly = of(this.map.keys);

  protected readonly form = this.fb.group({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });

  protected readonly onDateTimePicker = (obj: { start: Date; end: Date }) => {
    const milliseconds = obj.end.getTime() - obj.start.getTime();
    const seconds = milliseconds / 1000;
    this.map.set(obj.start.toString(), { start: obj.start, duration: seconds });
  };

  protected readonly toHrMins = (selected: Date) => toHrMins(selected);

  protected readonly onDateSelected = (selected: Date) =>
    (this.selected = selected);

  protected readonly onDeleteSchedule = (index: number) =>
    console.log('on delete ', index);

  protected readonly dates: () => { start: Date; end: Date }[] = () => {
    const dates: { start: Date; end: Date }[] = [];
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const start = new Date(now.getTime() + i * 60 * 60 * 1000); // Each start is one hour apart
      const end = new Date(start.getTime() + 60 * 60 * 1000); // End is one hour after start
      dates.push({ start, end });
    }
    return dates;
  };
}
