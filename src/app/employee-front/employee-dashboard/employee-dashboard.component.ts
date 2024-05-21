import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from '@/app/global-components/calendar/calendar.component';
import { TableComponent } from '@/app/global-components/table/table.component';

export interface Helper {
  name: string;
  colour: string;
  category: string;
  price: string;
  action: string;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CalendarComponent, TableComponent],
  templateUrl: './employee-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent {
  protected readonly date = new Date();

  protected toggleMobileCalendar = false;

  readonly thead: Array<keyof Helper> = [
    'name',
    'colour',
    'category',
    'price',
    'action',
  ];

  protected readonly rowClick = (event: Helper) =>
    console.log('row click event ', event);

  protected readonly actionClick = (event: Helper) =>
    console.log('action click event ', event);

  protected readonly tBody: Helper[] = [
    {
      name: 'Magic Mouse 2',
      colour: 'black',
      category: 'accessories',
      price: 'price',
      action: 'edit',
    },
    {
      name: 'Magic Mouse 2',
      colour: 'black',
      category: 'accessories',
      price: 'price',
      action: 'edit',
    },
    {
      name: 'Magic Mouse 2',
      colour: 'black',
      category: 'accessories',
      price: 'price',
      action: 'edit',
    },
  ];
}
