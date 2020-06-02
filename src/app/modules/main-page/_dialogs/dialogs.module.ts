import { RouterModule } from '@angular/router';
import { AccountIconModule } from '#shared/account-icon/account-icon.module';
import { AppPipesModule } from '#shared/pipes/app-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule, MatDatepickerModule
} from '@angular/material';

import {
  faAward,
  faBell,
  faCalendarAlt,
  faChartBar,
  faChevronDown,
  faChevronRight,
  faClipboard,
  faCoins,
  faExchangeAlt,
  faExclamation,
  faHome,
  faLevelUpAlt,
  faList,
} from '@fortawesome/free-solid-svg-icons';

import { AppMessageDialogComponent } from './app-message-dialog/app-message-dialog.component';
import { AddAccountDialogComponent } from './add-account-dialog/add-account-dialog.component';
import { AddOperationDialogComponent } from './add-operation-dialog/add-operation-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { NotificationItemComponent } from './notification-dialog/notification-item/notification-item.component';
import { AddEditEventDialogComponent } from './add-edit-event-dialog/add-edit-event-dialog.component';
import { ProcessDialogComponent } from './process-dialog/process-dialog.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

import { accountIconsPack } from './add-account-dialog/account-icons';
import { ColorPickerModule } from 'ngx-color-picker';
import { AddCyclicDialogComponent } from '#dialogs/add-cyclic-dialog/add-cyclic-dialog.component';

const matModules = [
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

export const dialogs = [
  AddOperationDialogComponent,
  ConfirmDialogComponent,
  AddAccountDialogComponent,
  AppMessageDialogComponent,
  ProcessDialogComponent,
  UserInfoDialogComponent,
  NotificationDialogComponent,
  EditCategoryComponent,
  AddEditEventDialogComponent,
  AddCyclicDialogComponent
];

@NgModule({
  declarations: [
    ...dialogs,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ColorPickerModule,
    AppPipesModule,
    AccountIconModule,
    ...matModules,
    MatDatepickerModule,
    RouterModule
  ],
  exports: [
    ...dialogs
  ]
})
export class DialogsModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIconPacks(accountIconsPack);
    faLibrary.addIcons(
      faClipboard,
      faExchangeAlt,
      faList,
      faCalendarAlt,
      faChartBar,
      faAward,
      faChevronRight,
      faChevronDown,
      faHome,
      faExclamation,
      faLevelUpAlt,
      faCoins,
      faBell
    );
  }
}
