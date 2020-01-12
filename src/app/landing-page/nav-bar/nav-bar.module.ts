import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { LoginWindowComponent } from '../login/login-window/login-window.component';
import { LoginModule} from '../login/login.module';


@NgModule({
  declarations: [
    NavBarComponent,
    // LoginWindowComponent
  ],
  imports: [
    CommonModule,
    LoginModule
  ],
  exports:[
    NavBarComponent
    // LoginWindowComponent
  ]
})
export class NavBarModule { }
