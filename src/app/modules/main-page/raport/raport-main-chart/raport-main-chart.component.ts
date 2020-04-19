import { Component, OnInit } from '@angular/core';
import {Label, SingleDataSet, SingleOrMultiDataSet} from 'ng2-charts';
import {ChartColor, ChartData, ChartDataSets, ChartLegendItem, ChartOptions, ChartType} from 'chart.js';

@Component({
  selector: 'svr-raport-main-chart',
  templateUrl: './raport-main-chart.component.html',
  styleUrls: ['./raport-main-chart.component.scss']
})
export class RaportMainChartComponent implements OnInit {
  private data = [
    {id: 0, date: '02/02', balance: 1200},
    {id: 1, date: '28/02', balance: -200},
    {id: 2, date: '05/03', balance: 400},
    {id: 3, date: '12/03', balance: 450},
    {id: 4, date: '07/04', balance: -300},
    {id: 5, date: '02/02', balance: 200},
    {id: 6, date: '28/02', balance: -20},
    {id: 7, date: '05/03', balance: 40},
    {id: 8, date: '12/03', balance: 450},
    {id: 9, date: '07/04', balance: -30},
    {id: 10, date: '02/02', balance: 100},
    {id: 11, date: '28/02', balance: -560},
    {id: 12, date: '05/03', balance: 440},
    {id: 13, date: '12/03', balance: -200},
    {id: 14, date: '07/04', balance: -300},
    {id: 15, date: '02/02', balance: 100},
    {id: 16, date: '28/02', balance: -20},
    {id: 17, date: '05/03', balance: 40},
    {id: 18, date: '12/03', balance: 500},
    {id: 19, date: '07/04', balance: -300},
    {id: 20, date: '02/02', balance: 1250},
    {id: 21, date: '28/02', balance: -250},
    {id: 22, date: '05/03', balance: 470},
    {id: 23, date: '12/03', balance: 420},
    {id: 24, date: '07/04', balance: -300}
  ];


  private chartOptions: ChartOptions = {
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
  private chartType: ChartType = 'bar';
  private chartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    }
  ];
  private chartColors: any = {
      backgroundColor: []
  };

  constructor() {
    this.data.forEach(value => {
      this.chartLabel.push(value.date);
      this.chartData[0].data.push(value.balance);
    });

    this.chartData[0].data.forEach((value, index) => {
      value > 0 ? this.chartData[0].backgroundColor[index] = 'green' : this.chartData[0].backgroundColor[index] = 'red';
    });

  }

  ngOnInit() {
  }

}
