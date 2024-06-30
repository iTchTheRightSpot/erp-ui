import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaginatorComponent } from '@/app/employee-front/shared/paginator.component';
import { UserService } from '@/app/employee-front/user/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '@/app/employee-front/user/user-card/user-card.component';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [PaginatorComponent, AsyncPipe, UserCardComponent],
  templateUrl: './all-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsersComponent {
  private readonly service = inject(UserService);

  protected readonly users$ = this.service.users();

  protected readonly onPageNumberClicked = (page: number) =>
    console.log('Page number clicked ', page);

  protected readonly onCardClicked = (employeeId: string) =>
    console.log('Employee id ', employeeId);
}
