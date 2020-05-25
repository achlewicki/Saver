import { DashboardComponent } from './dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBalanceComponent } from './dashboard-balance/dashboard-balance.component';
import { DashboardReportComponent } from './dashboard-report/dashboard-report.component';
import { DashboardOperationsComponent } from './dashboard-operations/dashboard-operations.component';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardCyclicComponent } from './dashboard-cyclic/dashboard-cyclic.component';
import { DashboardAchievementsComponent } from './dashboard-achievements/dashboard-achievements.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';
import {AppPipesModule} from '#shared/pipes/app-pipes.module';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardBalanceComponent,
    DashboardReportComponent,
    DashboardOperationsComponent,
    DashboardEventComponent,
    DashboardCyclicComponent,
    DashboardAchievementsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    AppPipesModule,
    FontAwesomeModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faCaretUp);
  }
}
