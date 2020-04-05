import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageCoreComponent } from './_landing-page-core/landing-page-core.component';

import { LandingNavBarComponent } from './landing-nav-bar/landing-nav-bar.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ContentComponent } from './content/content.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    ContentComponent,
    LandingPageCoreComponent,
    LandingNavBarComponent
  ],
  imports: [
    RegisterModule,
    LoginModule,
    CommonModule,
    RouterModule,
    LandingPageRoutingModule,
    MatButtonModule
  ]
})
export class LandingPageModule { }
