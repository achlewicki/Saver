import { ColorPickerModule } from 'ngx-color-picker';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { FirstLoginCoreComponent } from './first-login-core/first-login-core.component';
import { FirstLoginRoutingModule } from '#modules/first-login/first-login-routing.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { BillingPeriodComponent } from './billing-period/billing-period.component';

@NgModule({
  declarations: [
    FirstLoginCoreComponent,
    UserDataComponent,
    CreateAccountComponent,
    BillingPeriodComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FirstLoginRoutingModule,
    FlexLayoutModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    ColorPickerModule
  ]
})
export class FirstLoginModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faInfoCircle);
  }
}
