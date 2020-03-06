import { Component, OnInit } from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'svr-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private hservice: HeaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.hservice.viewTitle.next(x));
  }


}
