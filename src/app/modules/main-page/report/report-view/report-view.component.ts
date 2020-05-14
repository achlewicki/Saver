import { forkJoin, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { AccountHistoryModel } from '#models/account-history.model';
import { AccountHistoryService } from '#services/account-history-service/account-history.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '#services/account-service/account.service';
import { AccountAndAccountHistoryModel } from '#models/account-and-account-history.model';
import { AccountModel } from '#models/account.model';

@Component({
  selector: 'svr-raport-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
  // TODO accountList !!!!
  protected accountHistory: AccountHistoryModel[];
  protected balanceHistory$: Observable<AccountAndAccountHistoryModel[]>;

  protected dateForm: FormGroup;

  protected activeAccount: AccountModel;
  protected fullscreenChart = 'none';


  // private test: AccountAndAccountHistoryModel[] = [];

  // private dateFromPicker: MatDatepicker<any>;
  // private dateToPicker: MatDatepicker<any>;
  // private loaded = false;
  // private loaded2 = false;

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
      dateFrom: [new Date('2020/04/13'), [Validators.required]],
      dateTo: [new Date('2020/04/17'), [Validators.required]],
    });
  }

  ngOnInit() {
    this.mpService.activeAccount.subscribe(
      account => {
        this.activeAccount = account;
        this.getData();
      }
    );
  }

  private getData() {
    const dateFrom: Date = this.dateForm.get('dateFrom').value;
    const dateTo: Date = this.dateForm.get('dateTo').value;

    // this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(value1 => {
    //   value1.forEach((value2) => this.accounts.push(value2));
    //   this.accounts.forEach((value3, index) => {
    //     this.accountHistoryService.getInfo(value3.id, dateFrom, dateTo).subscribe(value4 => {
    //       const newSet: AccountAndAccountHistoryModel = {
    //         account: this.accounts[index],
    //         accountHistory: value4
    //       };
    //       this.test.push(newSet);
    //       if (value.id === value3.id) { this.accountHistory = value4; this.loaded = true; }
    //       if (index === this.accounts.length - 1) { this.loaded2 = true; }
    //     });
    //   });
    //   this.balanceHistory = this.test;
    //   // console.log(this.balanceHistory);
    //   // console.log(this.accountHistory);
    // });

    /* v1 */
    // this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(
    //   accountArray => {
    //     this.accounts = accountArray;
    //     const historyData$ = this.accounts.map(
    //       account => {
    //         return forkJoin(
    //           of(account),
    //           this.accountHistoryService.getInfo(account.id, dateFrom, dateTo)
    //           this.accountHistoryService.getInfo(account.id, dateFrom, dateTo)
    //           this.accountHistoryService.getInfo(account.id, dateFrom, dateTo)
    //         ).pipe(
    //           map(element => {
    //             return {
    //               account: element[0],
    //               accountHistory: element[1]
    //             } as AccountAndAccountHistoryModel;
    //           })
    //         );
    //       }
    //     );
    //     this.balanceHistory$ = forkJoin(historyData$).;
    //   }
    // );

    /* v2 */
    this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(
      accountArray => {
        const historyData$ = accountArray.map(
          async (account) => {
            const accountHistory = await this.accountHistoryService.getInfo(account.id, dateFrom, dateTo).toPromise();
            if (account.id === this.activeAccount.id) { this.accountHistory = accountHistory; }
            return {
              account,
              accountHistory
            } as AccountAndAccountHistoryModel;
          }
        );
        this.balanceHistory$ = forkJoin(historyData$);
      }
    );
  }

  protected setNewDateRange() {
    // const dateFrom = this.datePipe.transform(this.dateForm.value.dateFrom, 'yyyy/MM/dd').toString();
    // const dateTo = this.datePipe.transform(this.dateForm.value.dateTo, 'yyyy/MM/dd').toString();
    this.getData();
  }

  protected toggleChartOnFullscreen(chartType: string) {
    if (this.fullscreenChart === 'none') { this.fullscreenChart = chartType; } else { this.fullscreenChart = 'none'; }
  }

}
