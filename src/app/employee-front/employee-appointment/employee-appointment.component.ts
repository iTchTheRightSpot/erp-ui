import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import { map, of } from 'rxjs';
import {
  AppointmentDetail,
  dummyDetailBuilder,
} from '@/app/employee-front/shared/about-appointment.util';
import { toHrMins } from '@/app/app.util';
import { AppointmentDeconstruct } from '@/app/employee-front/employee-front.util';
import { UpdateAppointmentStatusDto } from '@/app/employee-front/employee-appointment/employee-appointmen.util';

@Component({
  selector: 'app-employee-appointment',
  standalone: true,
  imports: [
    AsyncPipe,
    TableComponent,
    CalendarComponent,
    AboutAppointmentComponent,
  ],
  templateUrl: './employee-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAppointmentComponent {
  protected selected = new Date();
  protected toggleMobileCalendar = false;

  constructor(
    private readonly employeeAppointmentService: EmployeeAppointmentService,
  ) {
    this.employeeAppointmentService.onUpdateCalendarMonth(this.selected);
    this.employeeAppointmentService.onCalendarDateClickSubjectClick(
      this.selected,
    );
  }

  protected readonly thead: Array<keyof AppointmentDeconstruct> = [
    'id',
    'status',
    'client',
    'service',
    'timeslot',
    'action',
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
  protected readonly daysToHighlight$ =
    this.employeeAppointmentService.subject$.pipe(
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

  protected readonly appointments$ =
    this.employeeAppointmentService.subjectClick$.pipe(
      map((objs) =>
        objs.map(
          (obj) =>
            ({
              id: obj.appointment_id,
              status: obj.status,
              service: obj.services[0].name,
              client: obj.customer_name,
              timeslot: `${toHrMins(obj.scheduled_for)} to ${toHrMins(obj.expire_at)}`,
              action: 'edit',
            }) as AppointmentDeconstruct,
        ),
      ),
    );

  /**
   * Updates UI based on the
   * */
  protected readonly onCalendarDateClick = (selected: Date) =>
    this.employeeAppointmentService.onCalendarDateClickSubjectClick(
      (this.selected = selected),
    );

  protected readonly onPrevNextCalendarClick = (date: Date) =>
    this.employeeAppointmentService.updateParentOnChangeMonthYear(date);

  protected toggleAboutAppointment = false;

  protected appointmentDetails = of(dummyDetailBuilder());
  protected readonly onAppointmentNameClick = (
    event: AppointmentDeconstruct,
  ) => {
    const obs = this.employeeAppointmentService.subject$.pipe(
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

  protected readonly updateAppointment$ =
    this.employeeAppointmentService.updateAppointment$;

  protected readonly updateAppointmentStatus = (obj: AppointmentDeconstruct) =>
    this.employeeAppointmentService.updateAppointmentStatus({
      appointment_id: obj.id,
      status: obj.status,
      employee_email: '',
    } as UpdateAppointmentStatusDto);
}
