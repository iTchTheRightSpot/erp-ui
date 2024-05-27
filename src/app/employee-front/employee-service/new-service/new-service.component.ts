import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [],
  templateUrl: './new-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceComponent {}
