import { inject, Injectable } from '@angular/core';
import { EmployeeFrontService } from '@/app/employee-front/employee-front.service';
import { BehaviorSubject, map, mergeMap, Observable, of } from 'rxjs';
import { AppointmentResponse } from '@/app/employee-front/employee-front.util';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  private readonly parentService = inject(EmployeeFrontService);

  private readonly subject = new BehaviorSubject<
    Observable<AppointmentResponse[]>
  >(of([]));

  private readonly subjectClick = new BehaviorSubject<
    Observable<AppointmentResponse[]>
  >(of([]));

  readonly subject$ = this.subject.asObservable().pipe(mergeMap((obs) => obs));

  readonly subjectClick$ = this.subjectClick
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  /**
   * Updates {@link subject$}.
   * */
  readonly onUpdateSubject = (selected: Date) =>
    this.subject.next(this.parentService.appointmentFilter(selected));

  /**
   * Updates {@link subjectClick$}.
   * */
  readonly onCalendarDateClickSubjectClick = (selected: Date) => {
    const obs$ = this.subject$.pipe(
      map((objs) =>
        objs.filter(
          (obj) => obj.scheduled_for.toDateString() === selected.toDateString(),
        ),
      ),
    );
    this.subjectClick.next(obs$);
  };

  /**
   * Makes call to server if
   * */
  readonly updateParentOnChangeMonthYear = (selected: Date) =>
    this.subject.next(this.parentService.appointmentFilter(selected));
}
