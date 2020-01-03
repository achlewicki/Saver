import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWindowComponent } from './login-window/login-window.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginWindowComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginWindowComponent
  ]
})
export class LoginModule { }
