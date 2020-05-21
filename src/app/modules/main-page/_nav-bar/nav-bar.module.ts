import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { NavAccountListComponent } from './nav-account-list/nav-account-list.component';
import { NavAccountItemComponent } from './nav-account-item/nav-account-item.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faClipboard,
  faExchangeAlt,
  faList,
  faCalendarAlt,
  faChartBar,
  faAward,
  faChevronRight,
  faChevronDown,
  faHome, faHourglassHalf, faSearchDollar
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    NavBarComponent,
    NavListComponent,
    NavAccountListComponent,
    NavAccountItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FlexLayoutModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faClipboard, faExchangeAlt, faList, faCalendarAlt, faChartBar, faAward, faChevronRight, faChevronDown, faHome, faHourglassHalf, faSearchDollar);
  }
}
