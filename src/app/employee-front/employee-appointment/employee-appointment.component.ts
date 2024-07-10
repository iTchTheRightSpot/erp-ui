import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';
import { AboutAppointmentComponent } from '@/app/employee-front/shared/about-appointment.component';
import {
  BehaviorSubject,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import {
  AppointmentDetail,
  dummyDetailBuilder
} from '@/app/employee-front/shared/about-appointment.util';
import { ApiStatus, TO_HR_MINS } from '@/app/app.util';
import {
  AppointmentDeconstruct,
  AppointmentResponse,
  ConfirmationStatus,
  KEY_OF_CONFIRMATION_STATUS
} from '@/app/employee-front/employee-front.util';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import {
  CalendarModule,
  CalendarMonthChangeEvent,
  CalendarYearChangeEvent
} from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-employee-appointment',
  standalone: true,
  imports: [
    AsyncPipe,
    AboutAppointmentComponent,
    CalendarModule,
    FormsModule,
    NgClass,
    TableModule,
    SkeletonModule
  ],
  templateUrl: './employee-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAppointmentComponent {
  protected date: Date[] | undefined;
  protected selectedDate = new Date();
  protected toggleMobileCalendar = false;
  protected readonly ApiStatus = ApiStatus;

  protected readonly form: FormGroup;

  constructor(
    private readonly appointmentService: EmployeeAppointmentService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) {
    this.appointmentService.onUpdateCalendarMonth(this.selectedDate);
    this.form = this.fb.group({
      appointmentId: new FormControl(-1, [Validators.required]),
      status: new FormControl(ConfirmationStatus.CANCELLED, [
        Validators.required
      ])
    });
  }

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
    map((objs) => objs.map((obj) => obj.scheduled_for))
  );

  protected readonly numberOfAppointmentsForMonth$ = this.daysToHighlightSubject
    .asObservable()
    .pipe(
      map((appointments) =>
        appointments.map((appointment) => appointment.scheduled_for)
      ),
      map((dates) =>
        dates.filter(
          (date) =>
            date.getMonth() === this.selectedDate.getMonth() &&
            date.getFullYear() === this.selectedDate.getFullYear()
        )
      ),
      map((dates: Date[] | undefined) => dates?.length)
    );

  private readonly calendarDateSubject = new BehaviorSubject<Date>(
    this.selectedDate
  );

  protected get appointments$(): Observable<AppointmentDeconstruct[]> {
    return this.calendarDateSubject.asObservable().pipe(
      switchMap((date) =>
        this.daysToHighlightSubject.pipe(
          map((objs) =>
            objs.filter(
              (obj) => date.toDateString() === obj.scheduled_for.toDateString()
            )
          )
        )
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
                  timeslot: `${TO_HR_MINS(appointment.scheduled_for)} <--> ${TO_HR_MINS(appointment.expired_at)}`
                }) as AppointmentDeconstruct
            )
      )
    );
  }

  /**
   * Updates UI based on the
   * */
  protected readonly onCalendarDateClick = (selected: Date) => {
    if (selected) this.calendarDateSubject.next((this.selectedDate = selected));
  };

  protected readonly onMonth = (event: CalendarMonthChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.appointmentService.updateParentOnChangeMonthYear(
        (this.selectedDate = new Date(
          year,
          month - 1,
          this.selectedDate.getDate()
        ))
      );
  };

  protected readonly onYear = (event: CalendarYearChangeEvent) => {
    const year = event.year;
    const month = event.month;
    if (year && month)
      this.appointmentService.updateParentOnChangeMonthYear(
        (this.selectedDate = new Date(
          year,
          month - 1,
          this.selectedDate.getDate()
        ))
      );
  };

  protected readonly contains = (dates: Date[], date: number, month: number) =>
    dates.some((d) => d.getDate() === date && d.getMonth() === month);

  protected toggleAboutAppointment = false;

  private readonly appointmentDetailsSubject = new BehaviorSubject<
    Observable<AppointmentDetail>
  >(of());

  protected readonly appointmentDetails$ = this.appointmentDetailsSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  protected readonly onAppointmentNameClick = (
    event: AppointmentDeconstruct
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
              expire: obj.expired_at
            } as AppointmentDetail)
          : dummyDetailBuilder()
      )
    );
    this.form.controls['appointmentId'].setValue(event.id);
    this.form.controls['status'].setValue(
      KEY_OF_CONFIRMATION_STATUS(event.status)
    );
    this.toggleAboutAppointment = true;
    this.appointmentDetailsSubject.next(obs);
  };

  protected readonly updateAppointmentStatus$ =
    this.appointmentService.updateAppointment$;

  protected readonly updateAppointmentStatus = (obj: {
    appointmentId: number;
    status: ConfirmationStatus;
  }) => {
    const user = this.authenticationService.activeUser();
    this.appointmentService.updateAppointmentStatus(
      {
        appointment_id: obj.appointmentId,
        status: obj.status,
        employee_id: user ? user.user_id : ''
      },
      this.selectedDate
    );
  };
}
