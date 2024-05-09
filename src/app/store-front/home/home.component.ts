import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from '@/app/global-components/navigation/navigation.component';
import { HomeService } from '@/app/store-front/home/home.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BOOK_ROUTE } from '@/app/store-front/util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent, AsyncPipe, RouterLink],
  styles: [
    `
      .trans {
        transition: all 2s ease;
        transition-delay: 1s, 250ms;
      }
    `,
  ],
  template: `
    <div
      class="trans w-full h-[100vh] bg-center bg-no-repeat bg-cover"
      [style.background-image]="'url(' + (image$ | async) + ')'"
    >
      <div
        class="lg-scr h-full flex flex-col gap-5 lg:gap-8 justify-center items-center"
      >
        <h1
          class="h-fit capitalize text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white"
        >
          perfecting landscapes one lawn at a time
        </h1>
        <a
          [routerLink]="BOOK_ROUTE"
          class="h-fit p-1 md:p-2 uppercase rounded flex items-center text-base sm:text-xl lg:text-2xl text-white bg-[var(--app-theme)] hover:bg-[var(--app-theme-hover)]"
        >
          book now
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly service = inject(HomeService);
  protected readonly image$ = this.service.image$;
  protected readonly BOOK_ROUTE = BOOK_ROUTE;
}
