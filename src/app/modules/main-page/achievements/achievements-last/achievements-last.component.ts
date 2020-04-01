import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-achievements-last',
  templateUrl: './achievements-last.component.html',
  styleUrls: ['./achievements-last.component.scss',
              '../achievements-view/achievements-view.component.scss']
})
export class AchievementsLastComponent implements OnInit {
  Achievements = [
    {id: 0, title: 'Achievement 1', img: '/assets/achievements/saved_got.svg', date: '21/04/2019', description: 'Now, Say my name dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true},
    {id: 1, title: 'Achievement 2', img: '/assets/achievements/level10_got.svg', date: '03/07.2018', description: 'You are Heisenberg dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true},
    {id: 2, title: 'Achievement 3', img: '/assets/achievements/level2_got.svg', date: '02/07/2019', description: 'You are goddamn right dwd wqd wd w dw d wdw dwd wdwd w dw dw dwd wdw dw dw dw', earned: true}
    ];

  constructor() {

  }

  ngOnInit() {
  }

}
