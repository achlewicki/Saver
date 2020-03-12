import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {FlexModule} from '@angular/flex-layout';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryComponent
  ],
    imports: [
        CommonModule,
        FlexModule,
        RouterModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        FormsModule
    ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
