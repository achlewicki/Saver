import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyclicComponent } from './cyclic/cyclic.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CyclicElementComponent } from './cyclic-element/cyclic-element.component';
import { AppPipesModule } from '#shared/pipes/app-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CyclicComponent,
    CyclicElementComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppPipesModule,
    FontAwesomeModule
  ],
  exports: [
    CyclicComponent
  ]
})
export class CyclicModule { }
