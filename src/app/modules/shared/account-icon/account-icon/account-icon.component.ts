import { Component, Input } from '@angular/core';

@Component({
  selector: 'svr-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.scss']
})
export class AccountIconComponent {
  @Input() public iconName: string;
  @Input() public color: string;
  @Input() public size: number;
}
