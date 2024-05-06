import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-front',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p>store-front works!</p>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontComponent {}
