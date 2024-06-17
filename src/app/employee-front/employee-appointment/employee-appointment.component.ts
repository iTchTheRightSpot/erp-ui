import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '@/app/employee-front/shared/table.component';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';
import { CalendarComponent } from '@/app/shared-components/calendar/calendar.component';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
import {
  AppointmentDetail,
  dummyDetailBuilder,
} from '@/app/employee-front/shared/about-appointment.util';
import { toHrMins } from '@/app/app.util';
import {
  AppointmentDeconstruct,
  AppointmentResponse,
} from '@/app/employee-front/employee-front.util';
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

  constructor(private readonly appointmentService: EmployeeAppointmentService) {
    this.appointmentService.onUpdateCalendarMonth(this.selected);
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
  private readonly daysToHighlightSubject = new BehaviorSubject<
    AppointmentResponse[]
  >([]);

  protected readonly daysToHighlight$ = this.appointmentService.subject$.pipe(
    tap((appointments) => this.daysToHighlightSubject.next(appointments)),
    map((objs) => objs.map((obj) => obj.scheduled_for)),
  );

  protected readonly numberOfAppointmentsForMonth$ = this.daysToHighlightSubject
    .asObservable()
    .pipe(
      map((appointments) =>
        appointments.map((appointment) => appointment.scheduled_for),
      ),
      map((dates) =>
        dates.filter(
          (date) =>
            date.getMonth() === this.selected.getMonth() &&
            date.getFullYear() === this.selected.getFullYear(),
        ),
      ),
      map((dates: Date[] | undefined) => dates?.length),
    );

  private readonly calendarDateSubject = new BehaviorSubject<Date>(
    this.selected,
  );

  protected get appointments$() {
    return this.calendarDateSubject.asObservable().pipe(
      switchMap((date) =>
        this.daysToHighlightSubject.pipe(
          map((objs) =>
            objs.filter(
              (obj) => date.toDateString() === obj.scheduled_for.toDateString(),
            ),
          ),
        ),
      ),
      map((appointments) =>
        !appointments
          ? []
          : appointments.map(
              (appointment) =>
                ({
                  id: appointment.appointment_id,
                  status: appointment.status,
                  service: appointment.services[0].name,
                  client: appointment.customer_name,
                  timeslot: `${toHrMins(appointment.scheduled_for)} <---> ${toHrMins(appointment.expire_at)}`,
                  action: 'edit',
                }) as AppointmentDeconstruct,
            ),
      ),
    );
  }

  /**
   * Updates UI based on the
   * */
  protected readonly onCalendarDateClick = (selected: Date) =>
    this.calendarDateSubject.next(selected);

  protected readonly onPrevNextCalendarClick = (date: Date) =>
    this.appointmentService.updateParentOnChangeMonthYear(
      (this.selected = date),
    );

  protected toggleAboutAppointment = false;

  protected appointmentDetails = of(dummyDetailBuilder());
  protected readonly onAppointmentNameClick = (
    event: AppointmentDeconstruct,
  ) => {
    const obs = this.appointmentService.subject$.pipe(
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
    this.appointmentService.updateAppointment$;

  protected readonly updateAppointmentStatus = (obj: AppointmentDeconstruct) =>
    this.appointmentService.updateAppointmentStatus({
      appointment_id: obj.id,
      status: obj.status,
      employee_email: '',
    } as UpdateAppointmentStatusDto);
}
