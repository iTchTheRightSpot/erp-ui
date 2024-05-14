import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly subject = new Subject<Date>();
  private readonly obs$ = this.subject.asObservable().pipe(
    distinctUntilChanged(),
    debounceTime(400),
    map((date: Date) => date),
  );
  private readonly sig = toSignal(this.obs$, { initialValue: undefined });

  readonly nextPrevButton = this.sig;
  readonly onNextPrevSignal = (date: Date) => this.subject.next(date);
}
