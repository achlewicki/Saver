import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';



@NgModule({
  declarations: [
    CarouselComponent,
    CarouselItemDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective
  ]
})
export class CarouselModule { }
