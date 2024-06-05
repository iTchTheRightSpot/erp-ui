import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeNavigationComponent } from '@/app/employee-front/employee-navigation/employee-navigation.component';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { AsyncPipe } from '@angular/common';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-employee-front',
  standalone: true,
  imports: [RouterOutlet, EmployeeNavigationComponent, AsyncPipe],
  template: `
    <div class="flex">
      <div>
        <app-employee-navigation
          [logout]="(logout$ | async) || false"
          (logoutEmitter)="emit()"
        />
      </div>

      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFrontComponent {
  private readonly service = inject(AuthenticationService);

  private readonly subject = new Subject<void>();

  protected readonly logout$ = this.subject
    .asObservable()
    .pipe(switchMap(() => this.service.logout()));

  protected readonly emit = () => this.subject.next();
}
