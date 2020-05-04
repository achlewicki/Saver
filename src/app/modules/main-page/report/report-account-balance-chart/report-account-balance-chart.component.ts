import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {AccountHistoryModel} from '#models/account-history.model';

@Component({
  selector: 'svr-raport-account-balance-chart',
  templateUrl: './report-account-balance-chart.component.html',
  styleUrls: ['./report-account-balance-chart.component.scss']
})
export class ReportAccountBalanceChartComponent implements OnInit {
  @Input() data: AccountHistoryModel[];
  private noData = false;

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Stan konta',
      fontSize: 20
    },
    // animation: {
    //   easing: 'easeInBack',
    //   duration: 2000
    // },
    // animation: (context) => {
    //   if (context.active) {
    //     return {
    //       duration: 400
    //     };
    //   }
    //   let delay = 0;
    //   const dsIndex = context.datasetIndex;
    //   const index = context.dataIndex;
    //   const chart = context.chart;
    //   delay = (11 - index) * 500;
    //   return {
    //     duration: 1000,
    //     y: {
    //       duration: 0,
    //     },
    //     x: {
    //       duration: 1000,
    //       from: 0,
    //       easing: 'easeOutCubic',
    //       delay
    //     },
    //     // y: {
    //     //   from: 150,
    //     //   delay
    //     // }
    //   };
    // },
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
  private chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Konto 1',
      lineTension: 0,
      fill: false,
      backgroundColor: 'blue'
    }
  ];

  constructor() {}

  ngOnInit() {
    let valueOfPrevious: number;
    this.data.forEach((value) => {
        this.chartLabel.push(value.data.toString());
        const index = this.chartData[0].data.length;
        if (value.report[0] !== undefined && value.report[0].balance !== undefined) {
          valueOfPrevious = value.report[0].balance;
          this.chartData[0].data.push(value.report[0].balance);
        } else  {this.chartData[0].data.push(valueOfPrevious); }
      }
    );
    // this.account2.forEach(value => this.chartData[1].data.push(value.balance));
    // this.account3.forEach(value => this.chartData[2].data.push(value.balance));
    console.log('ACC' + this.chartData[0].data);
    if (this.chartData[0].data[0] === undefined) {this.noData = true; }
  }

}
