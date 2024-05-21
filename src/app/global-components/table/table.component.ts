import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  tHead = input.required<(keyof T)[]>();
  tBody = input.required<T[]>();

  readonly rowClickEmitter = output<T>();
  readonly actionClickEmitter = output<T>();
}
