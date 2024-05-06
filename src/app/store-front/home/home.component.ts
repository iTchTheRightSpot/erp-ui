import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from '@/app/store-front/util/navigation/navigation.component';
import { HomeService } from '@/app/store-front/home/home.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent, AsyncPipe],
  styles: [
    `
      .trans {
        transition: all 2s ease;
        transition-delay: 1s, 250ms;
      }
    `,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly service = inject(HomeService);
  protected readonly image$ = this.service.image$;
}
