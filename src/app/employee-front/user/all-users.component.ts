import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [],
  template: `all users component works`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsersComponent {}
