import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {FlexModule} from '@angular/flex-layout';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    FlexModule
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
