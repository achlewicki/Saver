import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {FlexModule} from '@angular/flex-layout';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
