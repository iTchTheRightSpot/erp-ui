import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ConfirmationStatus } from '@/app/employee-front/employee-front.util';
import { FORMAT_SECONDS } from '@/app/app.util';
import { DeleteObject } from '@/app/employee-front/shared/table.component.util';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends { id: number | string }> {
  tHead = input.required<(keyof T)[]>();
  tBody = input.required<T[]>();
  loading = input<boolean>();

  deleteLoading = input<DeleteObject>();

  protected toggle = false;

  protected readonly status = [
    ConfirmationStatus.CONFIRMED,
    ConfirmationStatus.PENDING,
    ConfirmationStatus.EXPIRED,
    ConfirmationStatus.CANCELLED
  ];

  readonly rowClickEmitter = output<T>();
  readonly actionClickEmitter = output<T>();

  protected readonly formatSeconds = (seconds: unknown) =>
    FORMAT_SECONDS(seconds as number);

  protected readonly onUpdateStatus = (head: keyof T, body: T, event: Event) =>
    (body[head] = (event.target as HTMLSelectElement)
      .value as unknown as T[keyof T]);

  protected readonly emitActionClickEmitter = (generic: T) => {
    this.toggle = !this.toggle;
    this.actionClickEmitter.emit(generic);
  };
}
