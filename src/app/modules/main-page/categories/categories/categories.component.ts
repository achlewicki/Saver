import {Component, OnInit} from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { CategoryService} from '#services/category-service/category.service';
import {CategoryModel} from '#models/category.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CategoryAddModel} from '#models/categoryAdd.model';

@Component({
  selector: 'svr-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit {
  private categoriesList: CategoryModel[] = [];
  private categoriesControl = new FormControl();
  private filteredOptions: Observable<string[]>;
  private options: string[] = [];
  private visibleCategory: string[] = [];
  private categoryAdd: CategoryAddModel;
  private addCategoryPanel: boolean;
  private newCategoryTitle: string;
  private newCategoryColor: string;
  private newCategoryLimit: number;

  constructor(
    private readonly hservice: HeaderService,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService
  ) {
      this.addCategoryPanel = false;
      this.newCategoryTitle = '';

      this.categoryService.getAllCategories().subscribe(
        (response) => {
          this.categoriesList = response;
          this.categoriesList.forEach((value) => {
            this.options.push(value.title);
          });
          this.visibleCategory = this.options;
          console.log(this.categoriesList);
        }
      );

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
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private isContaing(title: string): boolean {
    return this.visibleCategory.find(value => value === title) ? true : false ;
  }

  private addCategory() {
    this.categoryAdd = {
      title: this.newCategoryTitle,
      color: this.newCategoryColor,
      limit: this.newCategoryLimit
    };

    this.newCategoryTitle = '';
    this.newCategoryColor = '';
    this.newCategoryLimit = null;

    this.categoryService.addCategory(this.categoryAdd).subscribe(
      (value: CategoryModel) => {
        this.categoriesList.push(value);
        this.options.push(value.title);
        this.visibleCategory.push(value.title);
      }
    );
  }
}
