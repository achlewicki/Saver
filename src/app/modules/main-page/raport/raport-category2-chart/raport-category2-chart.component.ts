import { Component, OnInit } from '@angular/core';
import {ChartData, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'svr-raport-category2-chart',
  templateUrl: './raport-category2-chart.component.html',
  styleUrls: ['./raport-category2-chart.component.scss']
})
export class RaportCategory2ChartComponent implements OnInit {

  private data = [
    {date: '08/04',
      outgo: [
        {amount: 200, category: '1', subcategory: 1},
        {amount: 200, category: '1', subcategory: 2},
        {amount: 200, category: '2', subcategory: 1},
        {amount: 200, category: '3', subcategory: 3}
      ]},
    {date: '09/04',
      outgo: [
        {amount: 200, category: '1', subcategory: 1},
        {amount: 200, category: '2', subcategory: 2},
        {amount: 200, category: '2', subcategory: 1},
        {amount: 200, category: '3', subcategory: 3}
      ]},
    {date: '10/04',
      outgo: [
        {amount: 200, category: '1', subcategory: 1},
        {amount: 200, category: '3', subcategory: 2},
        {amount: 200, category: '1', subcategory: 1},
        {amount: 200, category: '2', subcategory: 3}
      ]},
    {date: '11/04',
      outgo: [
        {amount: 200, category: '2', subcategory: 1},
        {amount: 200, category: '3', subcategory: 2},
        {amount: 200, category: '2', subcategory: 1},
        {amount: 200, category: '2', subcategory: 3}
      ]},
  ];


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
  private chartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: ['red', 'blue', 'orange']
      // label: [],
    }
  ];

  constructor() {
    let summaryCategory1 = 0;
    let summaryCategory2 = 0;
    let summaryCategory3 = 0;
    this.data.forEach((value) => {
      value.outgo.forEach(value1 => {
        value1.category === '1' ? summaryCategory1 += value1.amount :
          (value1.category === '2') ? summaryCategory2 += value1.amount : summaryCategory3 += value1.amount;
        !this.chartLabel.find(value2 => value2 === value1.category) ? this.chartLabel.push(value1.category) : null;
      });
    });
    this.chartData[0].data.push(summaryCategory1, summaryCategory2, summaryCategory3);
    // this.chartData[1].data.push(null, summaryCategory2, null);
    // this.chartData[2].data.push(null, null, summaryCategory3);
  }

  ngOnInit() {
  }

}
