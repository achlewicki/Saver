import { FlexLayoutModule } from '@angular/flex-layout';
import { AppPipesModule } from '#shared/pipes/app-pipes.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OperationsViewComponent } from './operations-view/operations-view.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './operation/operation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OperationFiltersComponent } from './operation-filters/operation-filters.component';
import { MatTreeModule, MatDatepickerModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { CategoryTreeComponent } from './operation-filters/category-tree/category-tree.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OperationsViewComponent,
    OperationComponent,
    OperationFiltersComponent,
    CategoryTreeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatTreeModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    AppPipesModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    OperationsViewComponent
  ]
})
export class OperationsModule { }
