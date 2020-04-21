import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { AddOperationDialogComponent } from './add-operation-dialog/add-operation-dialog.component';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

import {
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NotificationItemComponent } from './notification-dialog/notification-item/notification-item.component';
import {
  faAward,
  faCalendarAlt,
  faChartBar,
  faChevronDown,
  faChevronRight,
  faClipboard, faCoins,
  faExchangeAlt, faExclamation, faHome, faLevelUpAlt,
  faList, faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';


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
  UserInfoDialogComponent,
  NotificationDialogComponent
];

@NgModule({
  declarations: [
    ...dialogs,
    NotificationItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ...matModules
  ],
  exports: [
    ...dialogs,
  ]
})
export class DialogsModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faClipboard, faExchangeAlt, faList, faCalendarAlt, faChartBar, faAward, faChevronRight, faChevronDown, faHome, faExclamation, faLevelUpAlt, faCoins);
  }
}
