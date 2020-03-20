import { Component, OnInit } from '@angular/core';
import {AchievementsService} from '#services/achievements-service/achievements.service';
import {UserModel} from '#models/user.model';

@Component({
  selector: 'svr-achievements-level',
  templateUrl: './achievements-level.component.html',
  styleUrls: ['./achievements-level.component.scss']
})
export class AchievementsLevelComponent implements OnInit {
  private user: UserModel;

  constructor(
    private readonly achievementsService: AchievementsService
  ) {

    this.achievementsService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10)).subscribe(
      (value) => {
        this.user = value;
        console.log(this.user);
      }
    );

  }

  ngOnInit() {
  }

}
