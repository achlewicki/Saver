import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import {forkJoin, Observable} from 'rxjs';

import {AccountModel} from '#models/account.model';

@Component({
  selector: 'svr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  protected activeAccount: AccountModel;
  constructor(
    private mpService: MainPageService
  ) { }

  ngOnInit(): void {
    this.mpService.activeView.next({
      name: 'dashboard',
      title: 'Tablica',
      icon: faClipboard
    });

    // TODO czy zadziałą?
    this.mpService.operationAdded.subscribe(value => {
      this.activeAccount = this.activeAccount;
    });

    this.mpService.activeAccount.subscribe(account => {
      this.activeAccount = account;
    });
  }

}
