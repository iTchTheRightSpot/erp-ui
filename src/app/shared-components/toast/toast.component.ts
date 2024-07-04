import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgStyle],
  template: `
    <h3
      [ngStyle]="{ display: message().length > 0 ? 'block' : 'none' }"
      class="w-fit mt-3 p-3 rounded text-white bg-red-400"
    >
      {{ message() }}
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  message = input.required<string>();
}
