import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AchievementsAllComponent} from '#modules/main-page/achievements/achievements-all/achievements-all.component';
import {AchievementsLevelComponent} from '#modules/main-page/achievements/achievements-level/achievements-level.component';
import {AchievementsLastComponent} from '#modules/main-page/achievements/achievements-last/achievements-last.component';
import { AchievementsViewComponent } from './achievements-view/achievements-view.component';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    AchievementsAllComponent,
    AchievementsLevelComponent,
    AchievementsLastComponent,
    AchievementsViewComponent
  ],
  imports: [
    CommonModule,
    FlexModule
  ]
})
export class AchievementsModule { }
