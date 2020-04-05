import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule, MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EditCategoryComponent} from '#modules/main-page/categories/categories/edit-category/edit-category.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faCog
} from '@fortawesome/free-solid-svg-icons';



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
        FontAwesomeModule
    ],
  exports: [
    CategoriesComponent,
    FlexLayoutModule
  ]
})
export class CategoriesModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faCog);
  }
}
