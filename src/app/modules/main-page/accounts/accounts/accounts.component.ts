import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'svr-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(
    private mpservice: MainPageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.mpservice.activeView.next(x));
  }

}
