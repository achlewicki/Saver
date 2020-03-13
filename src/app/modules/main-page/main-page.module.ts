import { NavBarModule } from './_nav-bar/nav-bar.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { OperationsModule } from './operations/operations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountsModule } from './accounts/accounts.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';

import { HeaderComponent } from './_header/header.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MainPageCoreComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatButtonModule,
    NavBarModule,
    AccountsModule,
    DashboardModule,
    OperationsModule,
    UserProfileModule
  ]
})
export class MainPageModule { }
