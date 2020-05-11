import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'svr-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  private data = [
    {balance1: 1000, balance2: 1200, balance3: 400, income: 100, outcome: 300, date: '20/03'},
    {balance1: 1500, balance2: 1300, balance3: 400, income: 200, outcome: 100, date: '21/03'},
    {balance1: 800, balance2: 1300, balance3: 400, income: 300, outcome: 300, date: '22/03'},
    {balance1: 800, balance2: 1300, balance3: 400, income: 400, outcome: 300, date: '23/03'},
    {balance1: 700, balance2: 1400, balance3: 400, income: 50, outcome: 300, date: '24/03'},
    {balance1: 1000, balance2: 1500, balance3: 400, income: 0, outcome: 300, date: '25/03'},
    {balance1: 1200, balance2: 1600, balance3: 400, income: 1000, outcome: 400, date: '26/03'},
    {balance1: 2000, balance2: 1600, balance3: 400, income: 1200, outcome: 500, date: '27/03'},
    {balance1: 2000, balance2: 1600, balance3: 400, income: 100, outcome: 300, date: '28/03'},
    {balance1: 1800, balance2: 1800, balance3: 400, income: 50, outcome: 500, date: '29/03'},
  ];

  private chartOptions1: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Bilans dzienny wydatków i przychodów',
      fontSize: 20
    },
    animation: {
      easing: 'linear',
      duration: 2000
    },
    showLines: false
  };

  private chartLabel: Label[] = [];
  private chartLegend = false;
  private chartType1: ChartType = 'bar';
  private chartData1: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    }
  ];

  private chartOptions2: ChartOptions = {
    responsive: true,
    // wid
    title: {
      display: true,
      text: 'Stan konta',
      fontSize: 20
    },
    animation: {
      easing: 'linear',
      duration: 2000
    },
    showLines: true,
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

  private chartType2: ChartType = 'line';
  private chartData2: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      label: 'Konto na codzień',
      lineTension: 0,
      fill: false,
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    },
    {
      data: [],
      backgroundColor: [],
      label: 'Konto oszczędnościowe',
      lineTension: 0,
      fill: false,
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    },
    {
      data: [],
      backgroundColor: [],
      label: 'Konto rodzinne',
      lineTension: 0,
      fill: false,
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    }
  ];

  constructor() {
    const colors: string [] = [];
    this.data.forEach(value => {
      if (value.income - value.outcome > 0) { colors.push('green'); } else { colors.push('red'); }
      this.chartData1[0].data.push(value.income - value.outcome);
      // this.chartData2[0].data.push(value.balance1);
      // this.chartData2[1].data.push(value.balance2);
      // this.chartData2[2].data.push(value.balance3);
      this.chartLabel.push(value.date);
    });
    this.chartData1[0].backgroundColor = colors;
    this.chartData1[0].hoverBackgroundColor = colors;
  }
}
