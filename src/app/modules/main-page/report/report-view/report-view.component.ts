import { Component, OnInit } from '@angular/core';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {AccountHistoryModel} from '#models/account-history.model';
import {AccountHistoryService} from '#services/account-history-service/account-history.service';
import {DatePipe} from '@angular/common';
import {MatDatepicker} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '#services/account-service/account.service';
import {AccountAndAccountHistoryModel} from '#models/account-and-account-history.model';
import {AccountModel} from '#models/account.model';

@Component({
  selector: 'svr-raport-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
  // TODO accountList !!!!
  private accountHistory: AccountHistoryModel[];
  private balanceHistory: AccountAndAccountHistoryModel[];
  private test: AccountAndAccountHistoryModel[] = [];
  private accounts: AccountModel[];
  private dateForm: FormGroup;
  private dateFromPicker: MatDatepicker<any>;
  private dateToPicker: MatDatepicker<any>;
  private loaded = false;
  private loaded2 = false;
  private fullscreenChart = 'none';
  constructor(
    private readonly mpService: MainPageService,
    private readonly accountHistoryService: AccountHistoryService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
    private readonly accountService: AccountService,
  ) {
    this.mpService.activeView.next({
      name: 'reports',
      title: 'Raporty',
      icon: 'chart'
    });

    this.dateForm = this.fb.group({
      dateFrom: [[Validators.required]],
      dateTo: [[Validators.required]],
    });

    this.getData('2020/04/13', '2020/04/17');
  }

  ngOnInit() {
  }

  private getData(dateFrom: string, dateTo: string) {
    this.loaded = false;
    this.loaded2 = false;
    this.balanceHistory = [];
    this.test = [];
    this.accounts = [];
    this.accountHistory = [];
    this.mpService.activeAccount.subscribe(value => {
      this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(value1 => {
        value1.forEach((value2) => this.accounts.push(value2));
        this.accounts.forEach((value3, index) => {
          this.accountHistoryService.getInfo(value3.id, dateFrom, dateTo).subscribe(value4 => {
            const newSet: AccountAndAccountHistoryModel = {
              account: this.accounts[index],
              accountHistory: value4
            };
            this.test.push(newSet);
            if (value.id === value3.id) { this.accountHistory = value4; this.loaded = true; }
            if (index === this.accounts.length - 1) { this.loaded2 = true; }
          });
        });
        this.balanceHistory = this.test;
        // console.log(this.balanceHistory);
        // console.log(this.accountHistory);
      });
    });
  }

  private setNewDateRange() {
    const dateFrom = this.datePipe.transform(this.dateForm.value.dateFrom, 'yyyy/MM/dd').toString();
    const dateTo = this.datePipe.transform(this.dateForm.value.dateTo, 'yyyy/MM/dd').toString();
    this.getData(dateFrom, dateTo);
  }

  private toggleChartOnFullscreen(chartType: string) {
    if (this.fullscreenChart === 'none') { this.fullscreenChart = chartType; } else {this.fullscreenChart = 'none'; }
  }

}
