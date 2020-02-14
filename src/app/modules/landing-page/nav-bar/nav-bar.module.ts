import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    NavBarComponent,
    // LoginWindowComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    LoginModule
  ],
  exports: [
    NavBarComponent
    // LoginWindowComponent
  ]
})
export class NavBarModule { }
