import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppTooltipModule } from '#modules/shared/app-tooltip/app-tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppDirectivesModule } from '#shared/directives/app-directives.module';
import { AppPipesModule } from '#shared/pipes/app-pipes.module';




@NgModule({
  declarations: [
    EventsComponent,
    EventDetailsComponent,
    AddEditEventComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    FlexLayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    AppTooltipModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ColorPickerModule,
    AppDirectivesModule,
    AppPipesModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
