import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RaportViewComponent} from '#modules/main-page/raport/raport-view/raport-view.component';
import { RaportMainChartComponent } from './raport-main-chart/raport-main-chart.component';
import { RaportCategoryChartComponent } from './raport-category-chart/raport-category-chart.component';
import {ChartsModule} from 'ng2-charts';
import { RaportAccountBalanceChartComponent } from './raport-account-balance-chart/raport-account-balance-chart.component';
import { RaportCategory2ChartComponent } from './raport-category2-chart/raport-category2-chart.component';



@NgModule({
  declarations: [
    RaportViewComponent,
    RaportMainChartComponent,
    RaportCategoryChartComponent,
    RaportAccountBalanceChartComponent,
    RaportCategory2ChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ]
})

export class RaportModule { }
