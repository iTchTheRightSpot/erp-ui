import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { ToastService } from '@/app/global-service/toast.service';
import { AuthenticationService } from '@/app/global-service/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    ToastModule,
    ProgressSpinnerModule,
    ImageModule
  ],
  providers: [MessageService],
  template: `
    @if (csrf$ | async; as csrf) {
      @switch (csrf.state) {
        @case ('LOADING') {
          <div
            class="lg-scr h-full p-20 relative flex flex-col justify-center items-center"
          >
            <div class="relative inline-block">
              <p-progressSpinner
                aria-label="Loading"
                styleClass="w-96 h-96 m-0"
              ></p-progressSpinner>
              <div
                class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-2/4 text-xl md:text-2xl flex flex-col justify-center items-center text-center font-extralight text-[var(--app-theme-hover)]"
              >
                <p-image [src]="logo" alt="logo" width="120" />
                <span class="mt-2">Saturday Mowing Company</span>
              </div>
            </div>
          </div>
        }
        @case ('ERROR') {
          <div class="lg-scr p-10 text-3xl text-red-500">
            Please try again later as server is undergoing maintenance
          </div>
        }
        @case ('LOADED') {
          <p-toast></p-toast>
          @if (message$ | async) {}
          <router-outlet></router-outlet>
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly toastService = inject(ToastService);
  private readonly messageService = inject(MessageService);

  protected readonly logo = './assets/images/logo.jpeg';

  protected readonly message$ = this.toastService.message$.pipe(
    tap((message) => {
      if (message && message.length > 0)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: message
        });
    })
  );

  protected readonly csrf$ = this.authenticationService.csrf().pipe(
    map(() => ({ state: 'LOADED' })),
    startWith({ state: 'LOADING' }),
    catchError(() => of({ state: 'ERROR' }))
  );
}
