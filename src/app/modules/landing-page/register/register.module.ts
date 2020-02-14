import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterWindowComponent } from './register-window/register-window.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [RegisterWindowComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisterWindowComponent
  ]
})
export class RegisterModule { }
