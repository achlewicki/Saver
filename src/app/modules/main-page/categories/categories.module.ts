import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
// import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule
    // FlexModule
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
