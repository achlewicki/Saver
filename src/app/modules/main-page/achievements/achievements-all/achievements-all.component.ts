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
  private achievements: AchievementModel[];

  constructor(
    private readonly achievementsService: AchievementsService
  ) {
    this.activeIndex = null;
    this.achievementsService.getAllUserAchievements(parseInt(localStorage.getItem('user.id'), 10)).subscribe(
      (usersAchievements: UserAchievementModel[]) => {
        this.achievementsService.getAllAchievements().subscribe(
          (allAchievements) => {
            // usersAchievements.sort((singleAchievement1,singleAchievement2) => singleAchievement1.date - singleAchievement2.date);
            this.achievements = allAchievements;
            this.achievements.forEach(value => {
              if (usersAchievements.find(value1 => value1.achievement.id === value.id)) {
                value.src = '/assets/achievements/' + value.id.toString() + '_got.svg';
                value.date = usersAchievements[usersAchievements.findIndex(value1 => value1.achievement.id === value.id)].date;
              } else {
                value.src = '/assets/achievements/' + value.id.toString() + '.svg';
                value.date = null;
              }
            });
            let validAchievements = 0;
            this.achievements.forEach((singleAchievement, index) => {
              if (singleAchievement.date !== null) {
                validAchievements++;
                this.achievements.splice(index, 1);
                this.achievements.splice(0, 0, singleAchievement);
              }
            });
          }
        );
      }
    );
  }

   ngOnInit() {}
}
