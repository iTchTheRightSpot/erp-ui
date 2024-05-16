import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NavigationComponent } from '@/app/store-front/navigation/navigation.component';

@Component({
  selector: 'app-store-front',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NavigationComponent],
  template: `
    <div class="w-full h-full">
      <div
        class="lg-scr h-fit rounded-b z-10 border-b border-transparent fixed left-0 top-0 right-0"
      >
        <app-navigation />
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontComponent {}
