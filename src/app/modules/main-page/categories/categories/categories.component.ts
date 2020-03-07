import { Component, OnInit } from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'svr-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class CategoriesComponent implements OnInit {
  // private loopTimes: number;
  Categories = [
    {id: 1, name: 'Category 1', color: 'red'},
    {id: 2, name: 'Category 2', color: 'purple'},
    {id: 3, name: 'Category 3', color: 'orange'},
    {id: 4, name: 'Category 1', color: 'darkblue'},
    {id: 5, name: 'Category 2', color: 'pink'},
    {id: 6, name: 'Category 3', color: 'cyan'},
    {id: 7, name: 'Category 1', color: 'yellow'},
    {id: 8, name: 'Category 2', color: 'grey'},
    {id: 9, name: 'Category 3', color: 'brown'},
    {id: 10, name: 'Category 1', color: 'green'},
    {id: 11, name: 'Category 2', color: 'lightblue'},
    {id: 12, name: 'Category 3', color: 'gold'},
  ];

  public primary: string;
  private currentId: number;
  private currentPage: string;

  constructor(
    private hservice: HeaderService,
    private route: ActivatedRoute
  ) {
    this.currentPage = 'categories';
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.hservice.viewTitle.next(x));
  }

  private setCurrentId(id: number){
    this.currentId = id;
    this.currentPage = 'selectedCategory';
  }
}


