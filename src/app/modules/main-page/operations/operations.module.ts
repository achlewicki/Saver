import { OperationsViewComponent } from './operations-view/operations-view.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsGroupComponent } from './operations-group/operations-group.component';
import { OperationComponent } from './operation/operation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OperationFiltersComponent } from './operation-filters/operation-filters.component';



@NgModule({
  declarations: [
    OperationsViewComponent,
    OperationsGroupComponent,
    OperationComponent,
    OperationFiltersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    OperationsViewComponent
  ]
})
export class OperationsModule { }
