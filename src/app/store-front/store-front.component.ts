import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NavigationComponent } from '@/app/global-components/navigation/navigation.component';

@Component({
  selector: 'app-store-front',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavigationComponent],
  template: `
    <div class="w-full h-full">
      <div
        class="lg-scr h-fit rounded-b z-10 border-b border-transparent fixed left-0 top-0 right-0"
      >
        <app-navigation (routeEmitter)="navigate($event)" />
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontComponent {
  readonly router = inject(Router);

  navigate = (route: string): void => {
    this.router.navigate([`${route}`]);
  };
}
