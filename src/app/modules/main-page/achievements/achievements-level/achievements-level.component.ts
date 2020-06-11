import { Component, OnInit } from '@angular/core';
import { AchievementsService } from '#services/achievements-service/achievements.service';
import { UserModel } from '#models/user.model';

@Component({
  selector: 'svr-achievements-level',
  templateUrl: './achievements-level.component.html',
  styleUrls: ['./achievements-level.component.scss', '../achievements-view/achievements-view.component.scss']
})
export class AchievementsLevelComponent implements OnInit {
  protected user: UserModel;
  protected levelPercentage: number;

  constructor(
    private readonly achievementsService: AchievementsService
  ) {

  }

  ngOnInit() {
    this.achievementsService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10)).subscribe(
      (value) => {
        this.user = value;
        this.levelPercentage = value.experience / 500 * 100;
        document.documentElement.style.setProperty('--levelWidth', (this.levelPercentage.toString() + '%'));
        const animationTime = this.levelPercentage / 10;
        document.documentElement.style.setProperty('--animationTime', (animationTime.toString() + 's'));
      }
    );
  }

}
