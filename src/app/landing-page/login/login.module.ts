import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWindowComponent } from './login-window/login-window.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginWindowComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    LoginWindowComponent
  ]
})
export class LoginModule { }
