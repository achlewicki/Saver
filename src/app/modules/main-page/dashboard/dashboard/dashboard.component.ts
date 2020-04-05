import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private mpservice: MainPageService
  ) { }

  ngOnInit(): void {
    this.mpservice.activeView.next({
      name: 'dashboard',
      title: 'Tablica',
      icon: 'clipboard'
    });
  }

}
