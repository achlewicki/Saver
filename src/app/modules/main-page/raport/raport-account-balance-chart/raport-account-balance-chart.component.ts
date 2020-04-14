import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'svr-raport-account-balance-chart',
  templateUrl: './raport-account-balance-chart.component.html',
  styleUrls: ['./raport-account-balance-chart.component.scss']
})
export class RaportAccountBalanceChartComponent implements OnInit {

  private account1 = [
    {date: '01/04', balance: 3200},
    {date: '02/04', balance: 3000},
    {date: '03/04', balance: 2600},
    {date: '04/04', balance: 2800},
    {date: '05/04', balance: 3400},
    {date: '06/04', balance: 1500},
    {date: '07/04', balance: 1400},
    {date: '08/04', balance: 2000},
    {date: '09/04', balance: 500},
    {date: '10/04', balance: 750},
    {date: '11/04', balance: 3000},
  ];

  private account2 = [
    {date: '01/04', balance: 1200},
    {date: '02/04', balance: 1000},
    {date: '03/04', balance: 1000},
    {date: '04/04', balance: 1100},
    {date: '05/04', balance: 1100},
    {date: '06/04', balance: 1100},
    {date: '07/04', balance: 1100},
    {date: '08/04', balance: 1300},
    {date: '09/04', balance: 1300},
    {date: '10/04', balance: 1300},
    {date: '11/04', balance: 1300},
  ];

  private account3 = [
    {date: '01/04', balance: 200},
    {date: '02/04', balance: 150},
    {date: '03/04', balance: 170},
    {date: '04/04', balance: 100},
    {date: '05/04', balance: 200},
    {date: '06/04', balance: 180},
    {date: '07/04', balance: 160},
    {date: '08/04', balance: 144},
    {date: '09/04', balance: 200},
    {date: '10/04', balance: 180},
    {date: '11/04', balance: 200},
  ];


  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Stan konta',
      fontSize: 20
    },
    animation: {
      easing: 'easeInBack',
      duration: 2000
    },
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
      label: 'Konto na większe wydatki',
      lineTension: 0,
      fill: false
    },
    {
      data: [],
      label: 'Konto oszczędnościowe',
      lineTension: 0,
      fill: false
    },
    {
      data: [],
      label: 'Konto na codzień',
      lineTension: 0,
      fill: false
    }
  ];

  constructor() {
    this.account1.forEach((value) => {
      this.chartLabel.push(value.date);
      this.chartData[0].data.push(value.balance);
      }
    );
    this.account2.forEach(value => this.chartData[1].data.push(value.balance));
    this.account3.forEach(value => this.chartData[2].data.push(value.balance));
  }

  ngOnInit() {
  }

}
