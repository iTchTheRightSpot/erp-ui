import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentDatesService {
  private readonly sig = signal<string>('');
  readonly selectedEmployee = (staff: string) => this.sig.set(staff);
}
