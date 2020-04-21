import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatDividerModule, MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EditCategoryComponent} from '#modules/main-page/categories/edit-category/edit-category.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        FormsModule,
        MatDividerModule,
        MatButtonModule,
        ColorPickerModule,
        FontAwesomeModule
    ],
  exports: [
    CategoriesComponent,
    FlexLayoutModule
  ]
})
export class CategoriesModule { }
