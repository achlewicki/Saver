import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueInputDirective } from '#modules/shared/directives/value-input/value-input.directive';



@NgModule({
  declarations: [
    ValueInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValueInputDirective
  ]
})
export class AppDirectivesModule { }
