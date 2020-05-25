import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountIconComponent } from './account-icon/account-icon.component';



@NgModule({
  declarations: [
    AccountIconComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AccountIconComponent
  ]
})
export class AccountIconModule { }
