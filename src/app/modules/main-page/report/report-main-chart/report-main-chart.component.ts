import {Component, Input, OnInit} from '@angular/core';
import {Label, SingleDataSet, SingleOrMultiDataSet} from 'ng2-charts';
import {ChartColor, ChartData, ChartDataSets, ChartLegendItem, ChartOptions, ChartType} from 'chart.js';
import {AccountHistoryModel} from '#models/account-history.model';

@Component({
  selector: 'svr-raport-main-chart',
  templateUrl: './report-main-chart.component.html',
  styleUrls: ['./report-main-chart.component.scss']
})
export class ReportMainChartComponent implements OnInit {
  @Input() data: AccountHistoryModel[];

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
      hoverBackgroundColor: []
      // borderColor: 'blue',
      // fill: 'start',
      // lineTension: 0,
      // pointBorderColor: 'black',
      // pointBackgroundColor: 'green',
      // pointRadius: 5
    }
  ];

  constructor() {}

  ngOnInit() {
    this.data.forEach(value => {
      this.chartLabel.push(value.date.toString());
      // if (value.report[0] !== undefined) {this.chartData[0].data.push(value.report[0].balance); } else {this.chartData[0].data.push(0); }
      let outcomesSumarry = 0;
      let incomesSumarry = 0;
      value.incomes.forEach(value1 => incomesSumarry += value1);
      value.outcomes.forEach(value1 => outcomesSumarry += value1.value);
      this.chartData[0].data.push(incomesSumarry - outcomesSumarry);
    });

    this.chartData[0].data.forEach((value, index) => {
      value > 0 ? this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'green' :
        this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'red';
    });
  }

}
