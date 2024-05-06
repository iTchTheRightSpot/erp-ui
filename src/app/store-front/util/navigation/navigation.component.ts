import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  template: `nav works`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}
