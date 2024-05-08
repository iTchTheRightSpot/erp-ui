import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '@/app/global-components/toast/toast.service';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe, NgStyle],
  template: `
    @if (message$ | async; as message) {
      <h3
        [ngStyle]="{ display: message.length > 0 ? 'block' : 'none' }"
        class="w-fit mt-3 p-3 rounded text-white bg-red-400"
      >
        {{ message }}
      </h3>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private readonly service = inject(ToastService);
  protected readonly message$ = this.service.message$;
}
