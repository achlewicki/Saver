import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterWindowComponent } from './register-window/register-window.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterWindowComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegisterWindowComponent
  ]
})
export class RegisterModule { }
