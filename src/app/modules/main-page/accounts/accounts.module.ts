import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { CarouselModule } from '#modules/shared/carousel/carousel.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AppTooltipModule } from '#modules/shared/app-tooltip/app-tooltip.module';

import {
  faHome, faTrashAlt, faPen, faPlus, faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { AccountBalanceDetailsComponent } from './account-details/account-balance-details/account-balance-details.component';
import { AccountDetailsSummaryComponent } from './account-details/account-details-summary/account-details-summary.component';


@NgModule({
  declarations: [
    AccountsViewComponent,
    AccountDetailsComponent,
    AccountsListComponent,
    AccountBalanceDetailsComponent,
    AccountDetailsSummaryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    CarouselModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AppTooltipModule
  ],
  exports: [
    AccountsViewComponent
  ]
})
export class AccountsModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faHome, faTrashAlt, faPen, faPlus, faCaretUp);
  }
}
