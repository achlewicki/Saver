import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageCoreComponent } from './_main-page-core/main-page-core.component';

import { NavBarModule } from './_nav-bar/nav-bar.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { OperationsModule } from './operations/operations.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import {AchievementsModule} from '#modules/main-page/achievements/achievements.module';
import {ReportModule} from '#modules/main-page/report/report.module';
import {UserSettingsModule} from '#modules/main-page/user-settings/user-settings.module';
import { EventsModule } from './events/events.module';

import { HeaderComponent } from './_header/header.component';
import { AddOperationButtonComponent } from './add-operation-button/add-operation-button.component';

import { FlexModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { dialogs, DialogsModule } from './_dialogs/dialogs.module';

import {
  MatIconModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

import {CyclicModule} from '#modules/main-page/cyclic/cyclic.module';

const matModules = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule
];

const appModules = [
  NavBarModule,
  UserProfileModule,
  OperationsModule,
  DashboardModule,
  AccountsModule,
  CategoriesModule,
  UserSettingsModule,
  DialogsModule,
  AchievementsModule,
  ReportModule,
  EventsModule,
  CyclicModule
];


@NgModule({
  declarations: [
    MainPageCoreComponent,
    HeaderComponent,
    AddOperationButtonComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatButtonModule,
    FontAwesomeModule,
    FlexModule,
    ...appModules,
    ...matModules,
  ],
  entryComponents: [
    ...dialogs
  ]
})
export class MainPageModule { }
