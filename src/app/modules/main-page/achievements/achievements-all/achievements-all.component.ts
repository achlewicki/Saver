import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-achievements-all',
  templateUrl: './achievements-all.component.html',
  styleUrls: ['./achievements-all.component.scss', '../achievements-view/achievements-view.component.scss']
})
export class AchievementsAllComponent implements OnInit {
  private counter: number;
  // private showDescription: boolean;
  private activeIndex: number;
  Achievements = [
    {id: 0, title: 'Achievement 1', img: '/assets/achievements/saved', date: '21/04/2019', description: 'Now, Say my name dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true},
    {id: 1, title: 'Achievement 2', img: '/assets/achievements/level10', date: null, description: 'You are Heisenberg dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: false},
    {id: 2, title: 'Achievement 3', img: '/assets/achievements/level2', date: '02/07/2019', description: 'You are goddamn right dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true},
    {id: 3, title: 'Achievement 4', img: '/assets/achievements/login', date: '15/10/2019', description: 'I am the one who knock yym dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true},
    {id: 4, title: 'Achievement 5', img: '/assets/achievements/hello', date: null, description: 'Yeah, science bitch! dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: false}
  ];

  constructor() {
    this.activeIndex = null;
    this.Achievements.forEach(value => {
      if (value.earned) { value.img += '_got.svg'; } else { value.img += '.svg'; }
    });
  }


  ngOnInit() {
  }

}
