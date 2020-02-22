import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './_nav-bar/nav-bar.component';
import { HeaderComponent } from './_header/header.component';
import { OperationsComponent } from './operations/operations.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainPageCoreComponent,
    NavBarComponent,
    HeaderComponent,
    OperationsComponent,
    AccountsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
