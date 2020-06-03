import { Component } from '@angular/core';
import { UserAchievementModel } from '#models/userAchievement.model';
import { AchievementsService } from '#services/achievements-service/achievements.service';

@Component({
  selector: 'svr-achievements-last',
  templateUrl: './achievements-last.component.html',
  styleUrls: ['./achievements-last.component.scss',
    '../achievements-view/achievements-view.component.scss']
})
export class AchievementsLastComponent {
  private achievements: UserAchievementModel[];

  constructor(
    private readonly achievementsService: AchievementsService
  ) {
    this.achievementsService.getRecentAchievements().subscribe(
      (response: UserAchievementModel[]) => {
        this.achievements = response;
        this.achievements.forEach(value => value.achievement.src = '/assets/achievements/' + value.achievement.id.toString() + '_got.svg');
        // this.achievements.splice(2, 1);
      }
    );
  }
}
