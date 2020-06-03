import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    CategoriesComponent
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
    FontAwesomeModule,
    MatIconModule
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
