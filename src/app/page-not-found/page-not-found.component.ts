import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: `
    <div class="lg-scr mg-top p-2.5">
      <h1>Page not found :(</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {

}
