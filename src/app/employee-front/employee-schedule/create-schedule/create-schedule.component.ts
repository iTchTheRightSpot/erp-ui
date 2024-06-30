import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgStyle } from '@angular/common';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { toHrMins } from '@/app/app.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';
import { CacheService } from '@/app/global-service/cache.service';
import { filter, startWith, Subject, switchMap, tap } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { DesiredTimeDto } from '@/app/employee-front/employee-schedule/employee-schedule.util';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    DatePipe,
    TimePickerComponent,
    NgStyle,
    AsyncPipe,
    MatCard,
    MatCalendar,
  ],
  templateUrl: './create-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScheduleComponent {
  private static readonly scheduleCache = new CacheService<
    string,
    { start: Date; end: Date; duration: number }
  >();

  private readonly service = inject(ScheduleService);
  private readonly fb = inject(FormBuilder);

  protected selectedDate = new Date();
  protected toggle = false;
  protected dropdownToggle = false;
  protected toggleCalendar = false;
  protected readonly minimumDateOnCalendar = new Date();

  protected readonly staffs$ = this.service.staffs$;

  protected readonly onCalendarDateSelected = (selected: Date | null) => {
    if (selected)
      this.service.updateSelectedDate((this.selectedDate = selected));
  };

  /**
   * Converts a Date object to a string representing hours and minutes.
   * @param selected - The selected date.
   * @returns The string representation of the selected time in hours and minutes.
   */
  protected readonly toHrMins = (selected: Date) => toHrMins(selected);

  protected numberOfEntries = 0;
  protected readonly entries$ =
    CreateScheduleComponent.scheduleCache.entrySet$.pipe(
      filter((entries) =>
        entries.every(
          ([, value]) =>
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
    CreateScheduleComponent.scheduleCache.setItem(obj.start.toString(), {
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
    CreateScheduleComponent.scheduleCache.deleteItem(key);

  private readonly submitSubject = new Subject<void>();

  protected staffEmail = '';
  protected readonly onSelectedStaffEmail = (email: string) => {
    this.staffEmail = email;
    this.dropdownToggle = false;
  };

  /**
   * Observable that handles the submission of the form.
   * - When the {@link onSubmit} is clicked, it triggers the submission process.
   * - Emits false initially to hide the loading indicator.
   * - Combines the latest values from {@link scheduleCache.values$} when the submit button is clicked.
   * - Calls the {@link createSchedule} method of the ${@link ScheduleService} with the mapped schedule data.
   * - Manages the state of the submit button and clears the cache after submission.
   */
  protected readonly onSubmit$ = this.submitSubject.asObservable().pipe(
    withLatestFrom(CreateScheduleComponent.scheduleCache.values$),
    switchMap(
      ([_, objs]: [void, { start: Date; end: Date; duration: number }[]]) =>
        this.service
          .createSchedule(
            this.staffEmail,
            objs.map(
              (obj) =>
                ({
                  start: obj.start.toISOString(),
                  duration: obj.duration,
                }) as DesiredTimeDto,
            ),
          )
          .pipe(startWith(false)),
    ),
  );

  /**
   * Triggers the form submission.
   */
  protected readonly onSubmit = () => this.submitSubject.next();
}
