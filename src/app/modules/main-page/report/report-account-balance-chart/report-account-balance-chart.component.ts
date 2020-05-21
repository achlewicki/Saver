import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AccountHistoryModel } from '#models/account-history.model';
import { AccountService } from '#services/account-service/account.service';
import { AccountAndAccountHistoryModel } from '#models/account-and-account-history.model';

@Component({
  selector: 'svr-raport-account-balance-chart',
  templateUrl: './report-account-balance-chart.component.html',
  styleUrls: ['./report-account-balance-chart.component.scss']
})
export class ReportAccountBalanceChartComponent implements OnInit, OnChanges {
  @Input() data: AccountAndAccountHistoryModel[] = [];
  private noData = false;
  // private accountsNames: string [] = [];
  // private accountsColors: string [] = [];

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historia stanu konta',
      fontSize: 20
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  private chartLabel: Label[] = [];
  private chartLegend = true;
  private chartType: ChartType = 'line';
  private chartData: ChartDataSets[];

  constructor(
    private readonly accountService: AccountService
  ) { }

  ngOnInit() {
    this.chartData = [];
    this.chartLabel = [];
    this.noData = true;
    let valueOfPrevious: number;
    console.log(this.data);
    this.data.forEach((value1, index) => {
      const newSet: ChartDataSets = {
        data: [],
        label: value1.account.name,
        lineTension: 0,
        fill: false,
        backgroundColor: value1.account.color
      };
      this.chartData.push(newSet);
      valueOfPrevious = 0;
      value1.accountHistory.forEach((value3) => {
        if (index === 0) { this.chartLabel.push(value3.date.toString()); }
        // const index = this.chartData[0].data.length;
        if (value3.report[0] !== undefined && value3.report[0].balance !== undefined) {
          valueOfPrevious = value3.report[0].balance;
          this.chartData[index].data.push(value3.report[0].balance);
        } else { this.chartData[index].data.push(valueOfPrevious); }
      });
      this.noData = false;
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
