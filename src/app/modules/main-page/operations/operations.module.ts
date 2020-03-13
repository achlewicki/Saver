import { OperationsComponent } from './operations/operations.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    OperationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OperationsComponent
  ]
})
export class OperationsModule { }
