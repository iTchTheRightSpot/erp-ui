import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgStyle } from '@angular/common';
import { TimePickerComponent } from '@/app/employee-front/employee-schedule/time-picker/time-picker.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { toHrMins } from '@/app/app.util';
import { ScheduleService } from '@/app/employee-front/employee-schedule/schedule.service';
import { CacheService } from '@/app/global-service/cache.service';
import { map, startWith, Subject, switchMap } from 'rxjs';
import {DesiredTimeDto} from "@/app/employee-front/employee-schedule/employee-schedule.util";

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  imports: [DatePipe, TimePickerComponent, NgStyle, AsyncPipe],
  templateUrl: './create-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateScheduleComponent {
  private readonly service = inject(ScheduleService);
  private readonly fb = inject(FormBuilder);
  private readonly cacheService: CacheService<
    string,
    { start: Date; end: Date; duration: number }
  > = inject(CacheService);

  protected selected = this.service.selected;
  protected toggle = false;

  protected readonly staffs$ = this.service.staffs$;

  /**
   * Converts a Date object to a string representing hours and minutes.
   * @param selected - The selected date.
   * @returns The string representation of the selected time in hours and minutes.
   */
  protected readonly toHrMins = (selected: Date) => toHrMins(selected);

  /**
   * Observable of the keys in the cache service.
   */
  protected readonly keys$ = this.cacheService.keys$;

  /**
   * Retrieves the value from the cache service by key.
   * @param key - The key to retrieve the value for.
   * @returns An observable of the cached object or a default object if not found.
   */
  protected readonly value = (key: string) =>
    this.cacheService
      .getItem(key)
      .pipe(
        map((obj) =>
          obj ? obj : { start: new Date(), end: new Date(), duration: -1 },
        ),
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
    this.cacheService.setItem(obj.start.toString(), {
      start: obj.start,
      end: obj.end,
      duration: seconds,
    });
    this.toggle = !this.toggle;
  };

  /**
   * Deletes a schedule from the cache by key.
   * TODO integrate calling the server to delete schedule.
   * @param key - The key of the schedule to delete.
   */
  protected readonly onDeleteSchedule = (key: string) =>
    this.cacheService.deleteItem(key);

  private readonly submitSubject = new Subject<void>();

  private staffEmail = '';
  protected readonly onSelectedStaff = ($event: Event) =>
    (this.staffEmail = ($event.target as HTMLSelectElement).value);

  /**
   * Observable that handles the submission of the form.
   * Emits false initially to hide the loading indicator.
   */
  protected readonly onSubmit$ = this.submitSubject.asObservable().pipe(
    switchMap(() =>
      this.cacheService.values$.pipe(
        switchMap((objs) => this.service.createSchedule(this.staffEmail, objs.map(obj => ({ start: obj.start.toISOString(), duration: obj.duration } as DesiredTimeDto)))),
        startWith(false),
      ),
    ),
  );

  /**
   * Triggers the form submission.
   */
  protected readonly onSubmit = () => this.submitSubject.next();
}
