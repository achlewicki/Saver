import { UserProfileComponent } from './user-profile/user-profile.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
