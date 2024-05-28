import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, NgStyle } from '@angular/common';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { toHrMins } from '@/app/app.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [DatePipe, TimePickerComponent, NgStyle],
  templateUrl: './create-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScheduleComponent {
  private readonly service = inject(ScheduleService);
  private readonly fb = inject(FormBuilder);

  protected selected = this.service.selected;
  protected toggle = false;

  protected readonly toHrMins = (selected: Date) => toHrMins(selected);

  private readonly mapSignal = signal<
    Map<string, { start: Date; end: Date; duration: number }>
  >(new Map<string, { start: Date; end: Date; duration: number }>());

  protected readonly keys = this.mapSignal;

  protected readonly value = (key: string) => {
    const val = this.mapSignal().get(key);
    const temp = new Date();
    return val ? val : { start: temp, end: temp, duration: -1 };
  };

  protected readonly form = this.fb.group({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });

  protected readonly onDateTimePicker = (obj: { start: Date; end: Date }) => {
    const milliseconds = obj.end.getTime() - obj.start.getTime();
    const seconds = milliseconds / 1000;
    this.mapSignal().set(obj.start.toString(), {
      start: obj.start,
      end: obj.end,
      duration: seconds,
    });
    this.toggle = !this.toggle;
  };

  protected readonly onDeleteSchedule = (key: string) =>
    this.mapSignal().delete(key);

  protected readonly onSubmit = () =>
    this.service.createSchedule(Array.from(this.mapSignal().values()));
}
