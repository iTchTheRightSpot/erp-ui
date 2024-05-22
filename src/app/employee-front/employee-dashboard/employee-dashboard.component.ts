import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';
import { TableComponent } from '@/app/global-components/table/table.component';
import { EmployeeDashboardService } from '@/app/employee-front/employee-dashboard/employee-dashboard.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

export interface AppointmentDeconstruct {
  id: number;
  status: string;
  service: string;
  client: string;
  timeslot: string;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CalendarComponent, TableComponent, AsyncPipe],
  templateUrl: './employee-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent {
  private readonly service = inject(EmployeeDashboardService);

  constructor() {
    this.service.onUpdateSubject(this.selected);
    this.service.onCalendarDateClickSubjectClick(this.selected);
  }

  protected selected = new Date();
  protected toggleMobileCalendar = false;

  readonly thead: Array<keyof AppointmentDeconstruct> = [
    'id',
    'status',
    'service',
    'client',
    'timeslot',
  ];

  /**
   * Returns an observable that emits a list of {@link Date}s. These dates correspond
   * to the `scheduled_for` property of {@link AppointmentResponse}.
   *
   * @param selected - The date representing the month and year for which to retrieve
   * appointments. This date is used to filter appointments that fall within the start
   * and end of the specified month and year.
   * @returns An observable that emits a list of {@link Date}s to highlight within the
   * specified month.
   */
  protected readonly daysToHighlight = this.service.subject$.pipe(
    map((objs) => objs.map((obj) => obj.scheduled_for)),
  );

  /***/
  protected readonly appointments$ = this.service.subjectClick$.pipe(
    map((objs) =>
      objs.map(
        (obj) =>
          ({
            id: obj.appointment_id,
            status: obj.status,
            service: obj.services[0].name,
            client: obj.customer_name,
            timeslot: `${this.toHrMins(obj.scheduled_for)} to ${this.toHrMins(obj.expire_at)}`,
          }) as AppointmentDeconstruct,
      ),
    ),
  );

  private readonly toHrMins = (time: Date) =>
    new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  /**
   * Updates UI based on the
   * */
  protected readonly onCalendarDateClick = (selected: Date) => this.service.onCalendarDateClickSubjectClick(this.selected = selected);

  protected readonly onPrevNextCalendarClick = (date: Date) => {
    this.service.updateParentOnChangeMonthYear(date);
  };

  protected readonly rowClick = (event: AppointmentDeconstruct) =>
    console.log('row click event ', event);

  protected readonly actionClick = (event: AppointmentDeconstruct) =>
    console.log('action click event ', event);
}
