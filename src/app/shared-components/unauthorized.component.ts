import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STORE_FRONT_HOME } from '@/app/app.util';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="h-full bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1
            class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-primary-500"
          >
            Unauthorized
          </h1>
          <p
            class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
          >
            Something's wrong.
          </p>
          <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, you cannot access this page. Please sign in.
          </p>
          <a
            [routerLink]="HOME"
            class="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >Back to Homepage</a
          >
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {
  protected readonly HOME = STORE_FRONT_HOME;
}