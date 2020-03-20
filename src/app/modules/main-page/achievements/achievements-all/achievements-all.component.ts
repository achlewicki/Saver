import { Component, OnInit } from '@angular/core';

class Achievements = [
  {title: 'ach1', }
]

@Component({
  selector: 'svr-achievements',
  templateUrl: './achievements-all.component.html',
  styleUrls: ['./achievements-all.component.scss']
})
export class AchievementsAllComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
