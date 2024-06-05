import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import { ToastComponent } from '@/app/shared-components/toast/toast.component';
import { ToastService } from '@/app/shared-components/toast/toast.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, AsyncPipe],
  template: `
    @if (csrf$ | async; as csrf) {
      @switch (csrf.state) {
        @case ('LOADING') {
          <div class="lg-scr h-full p-20 flex justify-center items-center">
            <h1 class="capitalize text-[var(--app-theme)]">loading...</h1>
          </div>
        }
        @case ('ERROR') {
          <div class="lg-scr p-10 text-3xl text-red-500">
            Please try again later as server is undergoing maintenance
          </div>
        }
        @case ('LOADED') {
          <div
            class="lg-scr h-fit flex justify-end rounded-b z-15 border-b border-transparent fixed left-0 top-0 right-0"
          >
            <app-toast [message]="(message$ | async) || ''" />
          </div>

          <router-outlet></router-outlet>
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);

  protected readonly message$ = this.toastService.message$;
  protected readonly csrf$ = this.authenticationService.csrf().pipe(
    map(() => ({ state: 'LOADED' })),
    startWith({ state: 'LOADING' }),
    catchError(() => of({ state: 'ERROR' })),
  );
}
