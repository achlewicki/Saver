import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';

import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainPageCoreComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
