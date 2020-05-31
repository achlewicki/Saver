import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppPipesModule } from '#shared/pipes/app-pipes.module';
import { MatButtonModule, MatInputModule, MatDatepickerModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstalmentsComponent } from './instalments.component';
import { InstalmentsListComponent } from './instalments-list/instalments-list.component';
import { AddInstalmentsComponent } from './add-instalments/add-instalments.component';
import { InstalmentsListElementComponent } from './instalments-list/instalments-list-element/instalments-list-element.component';
import { InstalmentsListDetailsComponent } from './instalments-list/instalments-list-details/instalments-list-details.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InstalmentsComponent,
    InstalmentsListComponent,
    AddInstalmentsComponent,
    InstalmentsListElementComponent,
    InstalmentsListDetailsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AppPipesModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  exports: [
    InstalmentsComponent
  ]
})
export class InstalmentsModule { }
