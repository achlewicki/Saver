import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';



@NgModule({
  declarations: [
    TooltipComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    TooltipComponent
  ]
})
export class AppTooltipModule { }
