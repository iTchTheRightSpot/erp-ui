import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CsrfService } from '@/app/global-service/csrf/csrf.service';
import { catchError, map, of, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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
          <router-outlet></router-outlet>
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly service = inject(CsrfService);

  readonly csrf$ = this.service.csrf().pipe(
    map(() => ({ state: 'LOADED' })),
    startWith({ state: 'LOADING' }),
    catchError(() => of({ state: 'ERROR' })),
  );
}
