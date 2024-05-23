import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '@/app/global-components/table/table.component';
import { EmployeeAppointmentService } from '@/app/employee-front/employee-appointment/employee-appointment.service';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';

interface Helper {
  id: number;
  status: string;
  service: string;
  client: string;
  timeslot: string;
}

@Component({
  selector: 'app-employee-appointment',
  standalone: true,
  imports: [AsyncPipe, TableComponent, CalendarComponent],
  templateUrl: './employee-appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAppointmentComponent {
  private readonly service = inject(EmployeeAppointmentService);

  protected selected = new Date();
  protected toggleMobileCalendar = false;

  protected readonly thead: Array<keyof Helper> = [
    'id',
    'status',
    'client',
    'service',
    'timeslot',
  ];
  protected readonly tBody = [] as Helper[];
}
