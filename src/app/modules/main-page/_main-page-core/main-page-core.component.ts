import { MainPageService } from '#services/main-page-service/main-page.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-main-page-core',
  templateUrl: './main-page-core.component.html',
  styleUrls: ['./main-page-core.component.scss']
})
export class MainPageCoreComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.mainPageService.activeAccount.next(this.route.snapshot.data.account);
  }
}
