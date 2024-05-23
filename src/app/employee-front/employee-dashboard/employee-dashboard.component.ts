import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';
import { TableComponent } from '@/app/global-components/table/table.component';
import { EmployeeDashboardService } from '@/app/employee-front/employee-dashboard/employee-dashboard.service';
import { AsyncPipe } from '@angular/common';
import { map, of } from 'rxjs';
import { toHrMins } from '@/app/app.util';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import {
  AppointmentDetail,
  dummyDetailBuilder,
} from '@/app/employee-front/shared/about-appointment.util';

interface AppointmentDeconstruct {
  id: number;
  status: string;
  service: string;
  client: string;
  timeslot: string;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CalendarComponent,
    TableComponent,
    AsyncPipe,
    AboutAppointmentComponent,
  ],
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

  protected readonly thead: Array<keyof AppointmentDeconstruct> = [
    'id',
    'status',
    'client',
    'service',
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
  protected readonly daysToHighlight$ = this.service.subject$.pipe(
    map((objs) => objs.map((obj) => obj.scheduled_for)),
  );

  protected readonly numberOfAppointmentsForMonth$ = this.daysToHighlight$.pipe(
    map((dates) =>
      dates.filter(
        (date) =>
          date.getMonth() === this.selected.getMonth() &&
          date.getFullYear() === this.selected.getFullYear(),
      ),
    ),
    map((dates: Date[] | undefined) => dates?.length),
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
            timeslot: `${toHrMins(obj.scheduled_for)} to ${toHrMins(obj.expire_at)}`,
          }) as AppointmentDeconstruct,
      ),
    ),
  );

  /**
   * Updates UI based on the
   * */
  protected readonly onCalendarDateClick = (selected: Date) =>
    this.service.onCalendarDateClickSubjectClick((this.selected = selected));

  protected readonly onPrevNextCalendarClick = (date: Date) => {
    this.service.updateParentOnChangeMonthYear(date);
  };

  protected toggleAboutAppointment = false;

  protected appointmentDetails = of(dummyDetailBuilder());
  protected readonly onAppointmentNameClick = (
    event: AppointmentDeconstruct,
  ) => {
    const obs = this.service.subject$.pipe(
      map((objs) => objs.find((obj) => obj.appointment_id === event.id)),
      map((obj) =>
        obj
          ? ({
              name: obj.customer_name,
              email: obj.customer_email,
              phone: obj.phone,
              image: obj.image,
              status: obj.status,
              services: obj.services.map((names) => names.name),
              detail: obj.detail,
              address: obj.address,
              created: obj.created_at,
              scheduledFor: obj.scheduled_for,
              expire: obj.expire_at,
            } as AppointmentDetail)
          : dummyDetailBuilder(),
      ),
    );
    this.toggleAboutAppointment = true;
    this.appointmentDetails = obs;
  };
}
