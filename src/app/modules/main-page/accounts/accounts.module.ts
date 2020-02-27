import { AccountsComponent } from './accounts/accounts.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountsComponent
  ]
})
export class AccountsModule { }
