import {Component, OnInit} from '@angular/core';
import {AchievementsService} from '#services/achievements-service/achievements.service';
import {UserAchievementModel} from '#models/userAchievement.model';

@Component({
  selector: 'svr-dashboard-achievements',
  templateUrl: './dashboard-achievements.component.html',
  styleUrls: ['./dashboard-achievements.component.scss']
})
export class DashboardAchievementsComponent implements OnInit {
  protected achievements: UserAchievementModel[];

  constructor(
    private readonly achievementsService: AchievementsService,
  ) { }

  ngOnInit() {
    this.achievements = [];
    this.achievementsService.getRecentAchievements().subscribe( achievementsArray => {
      this.achievements = achievementsArray;
      this.achievements.forEach(value => value.achievement.src = '/assets/achievements/' + value.achievement.id.toString() + '_got.svg');
    });
  }
}
