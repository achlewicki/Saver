import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'svr-raport-category-chart',
  templateUrl: './raport-category-chart.component.html',
  styleUrls: ['./raport-category-chart.component.scss']
})
export class RaportCategoryChartComponent implements OnInit {
  private data = [
    {date: '08/04',
      outgo: [
        {amount: 200, category: 1, subcategory: 1},
        {amount: 200, category: 1, subcategory: 2},
        {amount: 200, category: 1, subcategory: 1},
        {amount: 200, category: 1, subcategory: 3}
      ]},
    {date: '09/04',
      outgo: [
        {amount: 200, category: 1, subcategory: 1},
        {amount: 200, category: 2, subcategory: 2},
        {amount: 200, category: 2, subcategory: 1},
        {amount: 200, category: 1, subcategory: 3}
      ]},
    {date: '10/04',
      outgo: [
        {amount: 200, category: 1, subcategory: 1},
        {amount: 200, category: 1, subcategory: 2},
        {amount: 200, category: 1, subcategory: 1},
        {amount: 200, category: 2, subcategory: 3}
      ]},
    {date: '11/04',
      outgo: [
        {amount: 200, category: 2, subcategory: 1},
        {amount: 200, category: 1, subcategory: 2},
        {amount: 200, category: 2, subcategory: 1},
        {amount: 200, category: 1, subcategory: 3}
      ]},
  ];


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
  private chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'category 1',
      stack: 'a'
    },
    {
      data: [],
      label: 'category 2',
      stack: 'a'
    }
  ];

  constructor() {
    this.data.forEach((value) => {
      let summaryCategory1 = 0;
      let summaryCategory2 = 0;
      this.chartLabel.push(value.date);
      value.outgo.forEach(value1 => {
        value1.category === 1 ? summaryCategory1 += value1.amount : summaryCategory2 += value1.amount;
      });
      this.chartData[0].data.push(summaryCategory1);
      this.chartData[1].data.push(summaryCategory2);
    });
  }

  ngOnInit() {
  }

}
