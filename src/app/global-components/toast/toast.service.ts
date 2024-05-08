import { Injectable } from '@angular/core';
import { concat, concatMap, Observable, of, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Manages the display of error messages in the UI.
   * */
  private readonly subject = new Subject<string>();

  /**
   * Emits error messages.
   *
   * @returns An Observable that resolves to the error message displayed
   * in {@link ToastComponent}.
   */
  readonly message$: Observable<string> = this.subject.pipe(
    concatMap((message) => {
      // emit the initial value immediately
      const initial$ = of(message);
      // emit a different value after 5 seconds
      const delayed$ = timer(5000).pipe(concatMap(() => of('')));
      // concatenate the observables to ensure they are emitted sequentially
      return concat(initial$, delayed$);
    }),
  );

  readonly toastMessage = (message: string) => this.subject.next(message);
}
