import {Component, Input, OnChanges} from '@angular/core';
import {AccountModel} from '#models/account.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {AccountHistoryService} from '#services/account-history-service/account-history.service';

@Component({
  selector: 'svr-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnChanges {
  @Input() account: AccountModel;
  protected todayDate2 = new Date();
  protected todayDate = new Date(this.todayDate2.getTime() - 1000 * 60 * 60 * 24 * 37);
  protected sevenDaysEarlier = new Date(this.todayDate2.getTime() - 1000 * 60 * 60 * 24 * 41);

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Bilans dzienny wydatków i przychodów',
      fontSize: 20
    },
    animation: {
      easing: 'linear',
      duration: 1000
    },
    showLines: false
  };

  private chartLabel: Label[] = [];
  private chartLegend = false;
  private chartType: ChartType = 'bar';
  private chartData: ChartDataSets[];

  constructor(
    private readonly accountHistoryService: AccountHistoryService,
  ) {
  }

  ngOnChanges() {
    this.chartData = [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
        // borderColor: 'blue',
        // fill: 'start',
        // lineTension: 0,
        // pointBorderColor: 'black',
        // pointBackgroundColor: 'green',
        // pointRadius: 5
      }
    ];
    this.chartLabel = [];
    this.accountHistoryService.getInfo(this.account.id, this.sevenDaysEarlier, this.todayDate).subscribe(accountHistory => {
      accountHistory.forEach((singleRecord, index) => {
        this.chartLabel.push(singleRecord.date.toString());
        let outcomesSumarry = 0;
        let incomesSumarry = 0;
        singleRecord.incomes.forEach(value => incomesSumarry += value);
        singleRecord.outcomes.forEach(value => outcomesSumarry += value.value);
        this.chartData[0].data.push(incomesSumarry - outcomesSumarry);
      });
      if (this.chartData[0]) {
        this.chartData[0].data.forEach((value, index) => {
          value > 0 ?
            this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'green' :
            this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'red';
        });
      }
    });
  }


}
