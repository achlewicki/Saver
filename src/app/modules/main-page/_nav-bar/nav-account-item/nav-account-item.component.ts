import {Component, Input, OnInit} from '@angular/core';
import {AccountModel} from '#models/account.model';
import {MainPageService} from '#services/main-page-service/main-page.service';

@Component({
  selector: 'svr-nav-account-item',
  templateUrl: './nav-account-item.component.html',
  styleUrls: ['./nav-account-item.component.scss']
})
export class NavAccountItemComponent implements OnInit {

  @Input()
  account: AccountModel;

  constructor(
    private mpservice: MainPageService,
  ) { }

  ngOnInit() {
  }

  onAccountClicked() {
    console.log('selected');
    this.mpservice.activeAccount.next(this.account);
  }
}
