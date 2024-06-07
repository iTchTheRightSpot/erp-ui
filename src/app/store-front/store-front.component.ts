import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '@/app/store-front/navigation/navigation.component';
import { AuthenticationService } from '@/app/global-service/authentication.service';
import { Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EmployeeNavigationComponent } from '@/app/employee-front/employee-navigation/employee-navigation.component';
import { Role } from '@/app/app.util';

@Component({
  selector: 'app-store-front',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    AsyncPipe,
    EmployeeNavigationComponent,
  ],
  template: `
    <div class="w-full h-full">
      <div
        class="lg-scr h-fit rounded-b z-10 border-b border-transparent fixed left-0 top-0 right-0"
      >
        <app-navigation
          [isStaff]="(isStaff | async) || false"
          [isSignedIn]="activeUser()?.principal !== ''"
          [logout]="(logout$ | async) || false"
          (logoutEmitter)="emit()"
        />
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontComponent {
  private readonly authenticationService = inject(AuthenticationService);
  protected readonly isStaff = this.authenticationService.isStaff();
  protected readonly activeUser = this.authenticationService.activeUser;
  private readonly subject = new Subject<void>();

  protected readonly logout$ = this.subject
    .asObservable()
    .pipe(switchMap(() => this.authenticationService.logout()));

  protected readonly emit = () => this.subject.next();
  protected readonly Role = Role;
}
