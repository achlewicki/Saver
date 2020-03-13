import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '#services/header-service/header.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'svr-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

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
