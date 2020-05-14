import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportViewComponent } from '#modules/main-page/report/report-view/report-view.component';
import { ReportMainChartComponent } from './report-main-chart/report-main-chart.component';
import { ReportCategoryChartComponent } from './report-category-chart/report-category-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ReportAccountBalanceChartComponent } from './report-account-balance-chart/report-account-balance-chart.component';
import { ReportCategory2ChartComponent } from './report-category2-chart/report-category2-chart.component';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ReportViewComponent,
    ReportMainChartComponent,
    ReportCategoryChartComponent,
    ReportAccountBalanceChartComponent,
    ReportCategory2ChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})

export class ReportModule { }
