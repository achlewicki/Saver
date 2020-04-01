import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';

import { NavBarModule } from './_nav-bar/nav-bar.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { OperationsModule } from './operations/operations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from '#modules/main-page/categories/categories.module';

import { HeaderComponent } from './_header/header.component';

import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material';

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
    UserProfileModule,
    CategoriesModule,
    FontAwesomeModule,
    MatIconModule,
    FlexModule
  ]
})
export class MainPageModule { }
