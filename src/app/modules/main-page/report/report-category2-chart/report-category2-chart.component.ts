import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AccountHistoryModel } from '#models/account-history.model';

@Component({
  selector: 'svr-raport-category2-chart',
  templateUrl: './report-category2-chart.component.html',
  styleUrls: ['./report-category2-chart.component.scss']
})
export class ReportCategory2ChartComponent implements OnInit, OnChanges {
  @Input() data: AccountHistoryModel[];
  private noData = false;

  private chartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Sumaryczne wydatki ze względu na kategorie',
      fontSize: 20
    },
    animation: {
      easing: 'linear',
      duration: 2000
    },

    // scale: {
    //   ticks: {
    //     display: false
    //   }
    // },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          display: false,
          ticks: {
            beginAtZero: true
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          display: false
        },

      ]
    }
  };

  private chartLabel: Label[] = [];
  private chartLegend = true;
  private chartType: ChartType = 'doughnut';
  private chartData: ChartDataSets[];

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.chartData = [
      {
        data: [],
        backgroundColor: [],
      }];
    this.chartLabel = [];
    const sumy: number[] = [];
    const colors: string[] = [];

    this.data.forEach(value => {
      value.outcomes.forEach(value1 => {
        if (value1 !== undefined) {
          if (!this.chartLabel.find(value2 => value2 === value1.subcategory.category.title) && value1.subcategory !== undefined) {
            this.chartLabel.push(value1.subcategory.category.title);
            this.chartData[0].data.push(value1.value);
            // Powoduje błędy cannot find '0' of undefined
            // this.chartData[0].backgroundColor[this.chartData[0].backgroundColor.length] = value1.subcategory.category.color;
            colors.push(value1.subcategory.category.color);
            sumy.push(value1.value);
          } else if (value1.subcategory !== undefined) {
            const index = this.chartLabel.findIndex(value2 => value2 === value1.subcategory.category.title);
            sumy[index] += value1.value;
          }
        }
      });
    });

    if (this.chartData[0]) {
      this.chartData[0].backgroundColor = colors;
      sumy.forEach((value, index) => this.chartData[0].data[index] = value);

      if (this.chartData[0].data.length === 0) {
        this.noData = true;
        const setForNoData: ChartDataSets = {
          data: []
        };
        this.chartData[0] = setForNoData;
      } else {
        this.noData = false;
      }
    }
  }

}
