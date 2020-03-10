import { Component, OnInit } from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import { CategoriesService} from '#services/categories-service/categories.service';
import {LoginModel} from '#models/login.model';
import {CategoryModel} from '#models/category.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

export const Categories = [
  {id: 1, name: 'Category 1', color: 'red', visible: true},
  {id: 2, name: 'Category 2', color: 'purple', visible: true},
  {id: 3, name: 'Category 3', color: 'orange', visible: true},
  {id: 4, name: 'Category 1', color: 'darkblue', visible: true},
  {id: 5, name: 'Category 2', color: 'pink', visible: true},
  {id: 6, name: 'Category 3', color: 'cyan', visible: true},
  {id: 7, name: 'Category 1', color: 'yellow', visible: false},
  {id: 8, name: 'Category 2', color: 'grey', visible: false},
  {id: 9, name: 'Category 3', color: 'brown', visible: true},
  {id: 10, name: 'Category 1', color: 'green', visible: true},
  {id: 11, name: 'Category 2', color: 'lightblue', visible: true},
  {id: 12, name: 'Category 3', color: 'gold', visible: true},
];

// @ts-ignore
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

  // protected mainCategories = Categories;
  protected mainCategories: CategoryModel[] = [];
  protected categoriesControl = new FormControl();
  private currentId: number;
  private currentPage: string;
  private errorInfo: string;
  protected filteredOptions: Observable<string[]>;
  private options: string[] = [];
  protected visibleCategory: string[] = [];

  constructor(
    private hservice: HeaderService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
      this.currentPage = 'categories';

      this.categoriesService.getAllCategories().subscribe(
        (response) => {
          // console.log(response);
          this.mainCategories = response;
          // console.log(this.mainCategories);
          this.mainCategories.forEach((value) => {
            this.options.push(value.title);
            console.log(value.title);
          });
          this.visibleCategory = this.options;
        }
      );

      console.log(this.options);
    }



    ngOnInit(): void {
    this.route.data
      .pipe(map(data => data.viewname))
      .subscribe((x) => this.hservice.viewTitle.next(x));

    this.filteredOptions = this.categoriesControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    this.filteredOptions.subscribe(response => {
      this.visibleCategory = response;
      console.log(this.visibleCategory);
    });


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private setCurrentId(id: number){
    this.currentId = id;
    this.currentPage = 'selectedCategory';
  }

  protected isContaing(title: string): boolean{
    return this.visibleCategory.find(value => value === title) ? true : false ;
  }


  protected onSubmit(): void {

  }
}


