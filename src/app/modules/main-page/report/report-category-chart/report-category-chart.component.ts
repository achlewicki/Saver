import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {AccountHistoryModel} from '#models/account-history.model';

@Component({
  selector: 'svr-raport-category-chart',
  templateUrl: './report-category-chart.component.html',
  styleUrls: ['./report-category-chart.component.scss']
})
export class ReportCategoryChartComponent implements OnInit {
  @Input() data: AccountHistoryModel[];
  private noData = false;

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Wydatki ze względu na kategorie',
      fontSize: 20
    },
    animation: {
      easing: 'linear'
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
  private chartType: ChartType = 'bar';
  private chartData: ChartDataSets[] = [];

  constructor() {}

  ngOnInit() {
    console.log(this.data);
    const sumy: number[] = [];
    this.data.forEach((value, index) => {
      this.chartLabel.push(value.data.toString());
      value.wydatki.forEach(value1 => {
        if (!this.chartData.find(value2 => value2.label === value1.subcategory.category.title) && value1.subcategory !== undefined) {
          const setArray: number[] = [];
          if (index > 0) {
            for (let i = 0; i < index; i++) {
              setArray.push(0);
            }
          }
          setArray.push(value1.value);
          const newSet: ChartDataSets = {
            data: setArray,
            backgroundColor: value1.subcategory.category.color,
            hoverBackgroundColor: value1.subcategory.category.color,
            label: value1.subcategory.category.title,
            stack: 'a'
          };
          this.chartData.push(newSet);
          sumy.push(value1.value);
        } else if (value1.subcategory !== undefined) {
          const index2 = this.chartData.findIndex(value2 => value2.label === value1.subcategory.category.title);
          if (sumy[index2] !== undefined) {
          } else {
            sumy[index2] = 0;
          }
          sumy[index2] += value1.value;
        }
      });

      this.chartData.forEach((value1, index3) => {
        value1.data[index] = sumy[index3];
        if (value1.data[index] === undefined) {value1.data[index] = 0; }
      });
      sumy.splice(0, sumy.length);
    });

    if (this.chartData.length === 0) {
      this.noData = true;
      const setForNoData: ChartDataSets = {
        data: []
      };
      this.chartData.push(setForNoData);
    }
  }
}
