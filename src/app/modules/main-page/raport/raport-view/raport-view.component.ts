import { Component, OnInit } from '@angular/core';
import {MainPageService} from '#services/main-page-service/main-page.service';

@Component({
  selector: 'svr-raport-view',
  templateUrl: './raport-view.component.html',
  styleUrls: ['./raport-view.component.scss']
})
export class RaportViewComponent implements OnInit {

  constructor(
    private readonly mpService: MainPageService,
  ) {
    this.mpService.activeView.next({
      name: 'raports', //takie samo jak w nav list !!!
      title: 'Raporty',
      icon: 'chart'
    });
  }

  ngOnInit() {
  }

}
