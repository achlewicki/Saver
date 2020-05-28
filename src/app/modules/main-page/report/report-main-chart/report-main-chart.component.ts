import { Component, Input, OnChanges } from '@angular/core';
import { Label, SingleDataSet, SingleOrMultiDataSet } from 'ng2-charts';
import { ChartColor, ChartData, ChartDataSets, ChartLegendItem, ChartOptions, ChartType } from 'chart.js';
import { AccountHistoryModel } from '#models/account-history.model';

@Component({
  selector: 'svr-raport-main-chart',
  templateUrl: './report-main-chart.component.html',
  styleUrls: ['./report-main-chart.component.scss']
})
export class ReportMainChartComponent implements OnChanges {
  @Input() data: AccountHistoryModel[] = [];
  @Input() width: number;

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

  constructor() { }

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
    this.data.forEach(element => {
      this.chartLabel.push(element.date.toString());
      // if (value.report[0] !== undefined) {this.chartData[0].data.push(value.report[0].balance); } else {this.chartData[0].data.push(0); }
      let outcomesSumarry = 0;
      let incomesSumarry = 0;
      element.incomes.forEach(value => incomesSumarry += value);
      element.outcomes.forEach(value => outcomesSumarry += value.value);
      this.chartData[0].data.push(incomesSumarry - outcomesSumarry);
    });

    if (this.chartData[0]) {
      this.chartData[0].data.forEach((value, index) => {
        value > 0 ?
          this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'green' :
          this.chartData[0].backgroundColor[index] = this.chartData[0].hoverBackgroundColor[index] = 'red';
      });
    }
  }

}
