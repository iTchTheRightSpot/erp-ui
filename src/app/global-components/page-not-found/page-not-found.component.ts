import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from '@/app/global-components/navigation/navigation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [NavigationComponent],
  template: `
    <div class="lg-scr">
      <app-navigation (routeEmitter)="navigate($event)" />
    </div>

    <div class="lg-scr p-2.5">
      <h1>Page not found :(</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  readonly router = inject(Router);
  navigate = (route: string): void => {
    this.router.navigate([`${route}`]);
  };
}
