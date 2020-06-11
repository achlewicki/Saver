import { Component } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { faAward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-achievements-view',
  templateUrl: './achievements-view.component.html',
  styleUrls: ['./achievements-view.component.scss']
})
export class AchievementsViewComponent {

  constructor(
    private readonly mpService: MainPageService,
  ) {
    this.mpService.activeView.next({
      name: 'achievements', //takie samo jak w nav list !!!
      title: 'Osiągnięcia',
      icon: faAward
    });
  }

}
