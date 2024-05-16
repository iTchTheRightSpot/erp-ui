import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from '@/app/global-components/navigation/navigation.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="min-h-[100vh] bg-white dark:bg-slate-800 flex flex-col items-center"
    >
      <h1
        class="text-slate-900 dark:text-white text-2xl lg:text-3xl mt-48 font-medium tracking-tight"
      >
        Page not found :(
      </h1>
      <a
        routerLink=""
        class="cursor-pointer text-slate-900 mt-8 dark:text-white underline text-2xl lg:text-3xl font-medium tracking-tight"
        >Go Home</a
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
