import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgStyle } from '@angular/common';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { toHrMins } from '@/app/app.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';
import { CacheService } from '@/app/global-service/cache.service';
import {
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { DesiredTimeDto } from '@/app/employee-front/employee-schedule/employee-schedule.util';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [DatePipe, TimePickerComponent, NgStyle, AsyncPipe],
  providers: [{ provide: CacheService, useClass: CacheService }],
  templateUrl: './create-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScheduleComponent {
  private readonly service = inject(ScheduleService);
  private readonly fb = inject(FormBuilder);
  private readonly scheduleCache: CacheService<
    string,
    { start: Date; end: Date; duration: number }
  > = inject(CacheService);

  protected selected = this.service.selected;
  protected toggle = false;
  protected dropdownToggle = false;

  protected readonly staffs$ = this.service.staffs$;

  /**
   * Converts a Date object to a string representing hours and minutes.
   * @param selected - The selected date.
   * @returns The string representation of the selected time in hours and minutes.
   */
  protected readonly toHrMins = (selected: Date) => toHrMins(selected);

  protected numberOfEntries = 0;
  protected readonly entries$ = this.scheduleCache.entrySet$.pipe(
    filter((entries) =>
      entries.every(
        ([key, value]) =>
          value.start !== undefined &&
          value.start !== null &&
          value.end !== undefined &&
          value.end !== null,
      ),
    ),
    tap((entries) => (this.numberOfEntries = entries.length)),
  );

  /**
   * Form used by staff with {@link Role#OWNER} to create a schedule for
   * staff with {@link Role#EMPLOYEE}.
   */
  protected readonly form = this.fb.group({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });

  /**
   * Handles the date-time picker changes.
   * @param obj - The object containing start and end dates.
   */
  protected readonly onDateTimePicker = (obj: { start: Date; end: Date }) => {
    const milliseconds = obj.end.getTime() - obj.start.getTime();
    const seconds = milliseconds / 1000;
    this.scheduleCache.setItem(obj.start.toString(), {
      start: obj.start,
      end: obj.end,
      duration: seconds,
    });
    this.toggle = !this.toggle;
  };

  /**
   * Deletes a schedule from the cache by key.
   * @param key - The key of the schedule to delete.
   */
  protected readonly onDeleteSchedule = (key: string) =>
    this.scheduleCache.deleteItem(key);

  private readonly submitSubject = new Subject<void>();

  protected staffEmail = '';
  protected readonly onSelectedStaffEmail = (email: string) => {
    this.staffEmail = email;
    this.dropdownToggle = false;
  };

  /**
   * Observable that handles the submission of the form.
   * Emits false initially to hide the loading indicator.
   */
  protected readonly onSubmit$ = this.submitSubject.asObservable().pipe(
    switchMap(() =>
      this.scheduleCache.values$.pipe(
        switchMap((objs) =>
          this.service.createSchedule(
            this.staffEmail,
            objs.map(
              (obj) =>
                ({
                  start: obj.start.toISOString(),
                  duration: obj.duration,
                }) as DesiredTimeDto,
            ),
          ),
        ),
        startWith(false),
      ),
    ),
  );

  /**
   * Triggers the form submission.
   */
  protected readonly onSubmit = () => this.submitSubject.next();
}
