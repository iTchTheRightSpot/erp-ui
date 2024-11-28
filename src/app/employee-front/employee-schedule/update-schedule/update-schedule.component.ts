import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { NgClass } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiStatus } from '@/app/app.util';

@Component({
  selector: 'app-update-schedule',
  standalone: true,
  imports: [
    DialogModule,
    TabViewModule,
    NgClass,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateScheduleComponent {
  constructor() {
    effect(() => {
      this.toggleUpdateScheduleDialog = this.toggleUpdateScheduleDialogSignal();
      this.toggleShiftVisibilityInStoreFront =
        this.toggleShiftVisibilityInStoreFrontSignal();
    });
  }

  protected toggleUpdateScheduleDialog = true;
  protected toggleShiftVisibilityInStoreFront = true;
  protected currentPTabPanelClicked = true;
  protected readonly ApiStatus = ApiStatus;

  toggleUpdateScheduleDialogSignal = model<boolean>(false);
  form = input.required<FormGroup>();
  localDate = input.required<Date>();
  shiftId = input.required<string>();
  toggleShiftVisibilityInStoreFrontSignal = input.required<boolean>();
  updateShiftVisibilityState = input.required<ApiStatus | null>();
  updateShiftDateTimeState = input.required<ApiStatus | null>();

  readonly toggleShiftVisibilityInStoreFrontEmitter = output<{
    shiftId: string;
    isVisible: boolean;
  }>();

  readonly updateAppointmentTimeEmitter = output<{
    shiftId: string;
    start: number;
    duration: number;
  }>();

  private readonly buildForm = () => {
    const date = this.localDate();
    const start = this.form().controls['start'].value;
    const end = this.form().controls['end'].value;

    const [startHrs, startMins] = (start ? start : '00:00')
      .split(':')
      .map(Number);
    const [endHrs, endMins] = (end ? end : '00:00').split(':').map(Number);

    return {
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        startHrs,
        startMins
      ),
      end: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        endHrs,
        endMins
      )
    };
  };

  protected readonly onEndTimeNotAfterStart = () => {
    const build = this.buildForm();
    return build.start >= build.end;
  };

  protected readonly submit = (shiftId: string) => {
    const form = this.buildForm();
    const start = form.start.getTime();
    const duration = (form.end.getTime() - start) / 1000;
    this.updateAppointmentTimeEmitter.emit({
      shiftId: shiftId,
      start: start,
      duration: duration
    });
  };
}
