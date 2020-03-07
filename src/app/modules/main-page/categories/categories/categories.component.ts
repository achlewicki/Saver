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
  // private loopTimes: number;
  Categories = [
    {id: 1, name: 'Category 1', color: 'red'},
    {id: 2,name: 'Category 2'},
    {id: 3,name: 'Category 3'},
    {id: 4,name: 'Category 1', color: 'blue'},
    {id: 5,name: 'Category 2'},
    {id: 6,name: 'Category 3'},
    {id: 7,name: 'Category 1', color: 'yellow'},
    {id: 8,name: 'Category 2'},
    {id: 9,name: 'Category 3'},
    {id: 10,name: 'Category 1', color: 'green'},
    {id: 11,name: 'Category 2'},
    {id: 12,name: 'Category 3'},
  ];

  public primary: string;
  private currentId: number;

  constructor(
    private hservice: HeaderService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.hservice.viewTitle.next(x));
  }

  private setCurrentId(id: number){
    this.currentId = id;
  }
}


