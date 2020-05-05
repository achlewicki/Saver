import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {AccountHistoryModel} from '#models/account-history.model';

@Component({
  selector: 'svr-raport-category2-chart',
  templateUrl: './report-category2-chart.component.html',
  styleUrls: ['./report-category2-chart.component.scss']
})
export class ReportCategory2ChartComponent implements OnInit {
  @Input() data: AccountHistoryModel[];
  private noData = false;

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Wydatki ze względu na kategorie 2',
      fontSize: 20
    },
    animation: {
      easing: 'linear',
      duration: 2000
    },
    scales: {
      xAxes: [
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
  private chartType: ChartType = 'horizontalBar';
  private chartData: ChartDataSets[] = [];

  constructor() {
  }

  ngOnInit() {
    const sumy: number[] = [];

    this.data.forEach(value => {
      value.wydatki.forEach(value1 => {
        if (value1 !== undefined) {
          if (!this.chartLabel.find(value2 => value2 === value1.subcategory.category.title) && value1.subcategory !== undefined) {
          this.chartLabel.push(value1.subcategory.category.title);
          const newSet: ChartDataSets = {
            data: [value1.value],
            backgroundColor: value1.subcategory.category.color,
            label: value1.subcategory.category.title
          };
          this.chartData.push(newSet);
          sumy.push(value1.value);
          } else if (value1.subcategory !== undefined) {
          const index = this.chartLabel.findIndex(value2 => value2 === value1.subcategory.category.title);
          sumy[index] += value1.value;
          }
        }
      });
    });

    sumy.forEach((value, index) => this.chartData[index].data[0] = value);
    if (this.chartData.length === 0) {
      this.noData = true;
      const setForNoData: ChartDataSets = {
        data: []
      };
      this.chartData.push(setForNoData);
    }
  }

}
