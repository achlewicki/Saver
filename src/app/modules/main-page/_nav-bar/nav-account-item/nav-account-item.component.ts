import { Component, Input } from '@angular/core';
import { AccountModel } from '#models/account.model';
import { MainPageService } from '#services/main-page-service/main-page.service';

@Component({
  selector: 'svr-nav-account-item',
  templateUrl: './nav-account-item.component.html',
  styleUrls: ['./nav-account-item.component.scss']
})
export class NavAccountItemComponent {

  @Input()
  account: AccountModel;

  constructor(
    private mpservice: MainPageService,
  ) { }

  onAccountClicked() {
    this.mpservice.activeAccount.next(this.account);
  }
}
