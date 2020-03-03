import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterWindowComponent } from './register-window/register-window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [RegisterWindowComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ],
  exports: [
    RegisterWindowComponent
  ]
})
export class RegisterModule { }
