import { MatButtonToggleModule } from '@angular/material';
import { InstalmentsModule } from './instalments/instalments.module';
import { CyclicModule } from './cyclic/cyclic.module';
import { CyclicAndInstalmentsComponent } from './cyclic-and-instalments/cyclic-and-instalments.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CyclicAndInstalmentsComponent
  ],
  imports: [
    CommonModule,
    CyclicModule,
    InstalmentsModule,
    MatButtonToggleModule
  ],
  exports: [
    CyclicAndInstalmentsComponent
  ]
})
export class CyclicAndInstalmentsModule { }
