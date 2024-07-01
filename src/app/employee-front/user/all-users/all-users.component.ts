import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaginatorComponent } from '@/app/employee-front/shared/paginator.component';
import { UserService } from '@/app/employee-front/user/user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '@/app/employee-front/user/user-card/user-card.component';
import { SearchBarComponent } from '@/app/employee-front/user/search-bar/search-bar.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchProperties } from '@/app/employee-front/user/search-bar/search-bar.util';
import {
  BehaviorSubject,
  mergeMap,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Role } from '@/app/app.util';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    PaginatorComponent,
    AsyncPipe,
    UserCardComponent,
    SearchBarComponent,
  ],
  templateUrl: './all-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsersComponent {
  private readonly service = inject(UserService);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({ search: new FormControl('') });

  private readonly userSubject = new BehaviorSubject<{
    page: number;
    size: number;
    role: Role | null;
    name: string;
  }>({ page: 0, size: 30, role: null, name: '' });

  protected readonly users$ = this.userSubject
    .asObservable()
    .pipe(
      switchMap((obj) =>
        this.service.users(obj.page, obj.size, obj.role, obj.name),
      ),
    );

  private currentPageNumber = 0;
  protected readonly onPageNumberClicked = (page: number) =>
    this.userSubject.next({
      page: (this.currentPageNumber = page),
      size: 30,
      role: null,
      name: this.search,
    });

  private search = '';
  protected readonly searchEmitter = (obj: SearchProperties) =>
    this.userSubject.next({
      page: this.currentPageNumber,
      size: 30,
      role: null,
      name: (this.search = obj.search),
    });

  private readonly updateRoleSubject = new Subject<Observable<boolean>>();
  protected readonly updateRoleStatus$ = this.updateRoleSubject
    .asObservable()
    .pipe(mergeMap((obs) => obs));

  protected readonly onUpdateRoleEmitter = (obj: {
    employeeId: string;
    role: Role;
  }) =>
    this.updateRoleSubject.next(
      this.service.updateUserRole(
        obj,
        this.currentPageNumber,
        30,
        null,
        this.search,
      ),
    );
}
