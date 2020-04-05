import { Component, OnInit } from '@angular/core';
import {UserAchievementModel} from '#models/userAchievement.model';
import {AchievementsService} from '#services/achievements-service/achievements.service';
import * as moment from 'moment';
import {AchievementModel} from '#models/achievement.model';

@Component({
  selector: 'svr-achievements-all',
  templateUrl: './achievements-all.component.html',
  styleUrls: ['./achievements-all.component.scss', '../achievements-view/achievements-view.component.scss']
})

export class AchievementsAllComponent implements OnInit {
  private activeIndex: number;
  private userAchievements: UserAchievementModel[];
  private achievements: AchievementModel[];
  // private moment: moment;

  constructor(
    private readonly achievementsService: AchievementsService
  ) {
    this.activeIndex = null;
    this.achievementsService.getAllUserAchievements(parseInt(localStorage.getItem('user.id'), 10)).subscribe(
      (response: UserAchievementModel[]) => {
        this.userAchievements = response;
      }
    );
  }

   ngOnInit() {
    this.achievementsService.getAllAchievements().subscribe(
      (response) => {
        this.achievements = response;
        this.achievements.forEach(value => {
          if (!!this.userAchievements.find(value1 => value1.achievement.id === value.id)) {
            value.src = '/assets/achievements/' + value.id.toString() + '_got.svg';
          } else {
            value.src = '/assets/achievements/' + value.id.toString() + '.svg';
            value.date = null;
          }
        });
        console.log(this.achievements);
      }
    );
  }
}
