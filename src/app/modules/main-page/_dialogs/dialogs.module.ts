import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddOperationDialogComponent } from './add-operation-dialog/add-operation-dialog.component';

import {
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';

const matModules = [
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

export const dialogs = [
  AddOperationDialogComponent
];

@NgModule({
  declarations: [
    ...dialogs
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
export class DialogsModule { }
