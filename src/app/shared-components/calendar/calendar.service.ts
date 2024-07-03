import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class CalendarService {
  private readonly onNextPreviousSubject = new Subject<Date>();

  readonly onPreviousNextEmitterDate$ =
    this.onNextPreviousSubject.asObservable();

  readonly emitNextPreviousDates = (date: Date) =>
    this.onNextPreviousSubject.next(date);
}
