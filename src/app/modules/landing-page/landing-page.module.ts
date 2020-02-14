import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    RegisterModule,
    LoginModule,
    CommonModule
  ]
})
export class LandingPageModule { }
