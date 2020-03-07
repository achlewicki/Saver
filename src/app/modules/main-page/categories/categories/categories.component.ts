import { Component, OnInit } from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'svr-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  // private loopTimes: number;
  Categories = [
    {name: 'Category 1', color: 'red'},
    {name: 'Category 2'},
    {name: 'Category 3'},
    {name: 'Category 1', color: 'blue'},
    {name: 'Category 2'},
    {name: 'Category 3'},
    {name: 'Category 1', color: 'yellow'},
    {name: 'Category 2'},
    {name: 'Category 3'},
    {name: 'Category 1', color: 'green'},
    {name: 'Category 2'},
    {name: 'Category 3'},
  ];

  public primary: string;

  constructor(
    public dialog: MatDialog,
    private hservice: HeaderService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.hservice.viewTitle.next(x));
  }

  openDialog(){
    this.dialog.open();
  }
}


