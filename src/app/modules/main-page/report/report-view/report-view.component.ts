import { Component, OnInit } from '@angular/core';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {AccountHistoryModel} from '#models/account-history.model';
import {AccountHistoryService} from '#services/account-history-service/account-history.service';
import {DatePipe} from '@angular/common';
import {MatDatepicker} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'svr-raport-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
  // TODO accountList !!!!
  private accountHistory: AccountHistoryModel[];
  private dateForm: FormGroup;
  private dateFromPicker: MatDatepicker<any>;
  private dateToPicker: MatDatepicker<any>;
  private loaded = false;

  constructor(
    private readonly mpService: MainPageService,
    private readonly accountHistoryService: AccountHistoryService,
    private readonly fb: FormBuilder,
    private readonly datePipe: DatePipe,
  ) {
    this.mpService.activeView.next({
      name: 'reports', //takie samo jak w nav list !!!
      title: 'Raporty',
      icon: 'chart'
    });

    this.dateForm = this.fb.group({
      dateFrom: [[Validators.required]],
      dateTo: [[Validators.required]],
    });

    this.accountHistoryService.getInfo(7, '2020/04/13', '2020/04/17').subscribe(value => {
      this.accountHistory = value;
      this.loaded = true;
      console.log(this.accountHistory);
    });



  }

  ngOnInit() {
  }

  private setNewDateRange() {
    this.loaded = false;

    // TODO accountId zmienić na dynamiczne
    this.accountHistoryService.getInfo(7, this.datePipe.transform(this.dateForm.value.dateFrom._d, 'yyyy/MM/dd').toString(),
      this.datePipe.transform(this.dateForm.value.dateTo._d, 'yyyy/MM/dd').toString()).subscribe(value => {
        this.accountHistory = value;
        this.loaded = true;
        console.log(this.accountHistory);
    });
  }


}
