import { Component, OnInit } from '@angular/core';
import { HeaderService } from '#services/header-service/header.service';
import { ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import { CategoryService} from '#services/category-service/category.service';
import {CategoryModel} from '#models/category.model';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {SubcategoryModel} from '#models/subcategory.model';
import {SubcategoryService} from '#services/subcategory-service/subcategory.service';
import {SubcategoryAddModel} from '#models/subcategoryAdd.model';
import {CategoryAddModel} from '#models/categoryAdd.model';


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

  protected categoriesList: CategoryModel[] = [];
  private activeCategory: CategoryModel;
  protected categoriesControl = new FormControl();
  private currentIndex: number;
  private currentPage: string;
  private errorInfo: string;
  protected filteredOptions: Observable<string[]>;
  private options: string[] = [];
  protected visibleCategory: string[] = [];
  protected subcategoryAdd: SubcategoryAddModel;
  protected newSubcategory: SubcategoryModel;
  protected categoryAdd: CategoryAddModel;
  private addCategoryPanel: boolean;
  protected newCategoryTitle: string;
  protected newCategoryColor: string;
  protected newCategoryLimit: number;
  protected newSubcategoryTitle: string;
  protected newSubcategoryColor: string;

  constructor(
    private hservice: HeaderService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {
      this.currentPage = 'categories';
      this.addCategoryPanel = false;
      this.newCategoryTitle = '';


      this.categoryService.getAllCategories().subscribe(
        (response) => {
          // console.log(response);
          this.categoriesList = response;
          // console.log(this.mainCategories);
          this.categoriesList.forEach((value) => {
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
      // console.log(this.visibleCategory);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private setActiveCategory(index: number, category: CategoryModel){
    this.currentIndex = index;
    this.currentPage = 'selectedCategory';
    this.activeCategory = category;
  }

  protected isContaing(title: string): boolean{
    return this.visibleCategory.find(value => value === title) ? true : false ;
  }

  protected updateSubcategory(subcategory: SubcategoryModel, index: number) {
    console.log(this.categoriesList[this.currentIndex].subcategories[index]);
    this.subcategoryService.updateSubcategory(subcategory).subscribe();
    // console.log(subcategory.title);
  }

  protected updateCategory() {
    this.categoryService.updateCategory(this.activeCategory).
    subscribe((response: CategoryModel) => {
        this.categoriesList[this.currentIndex] = response;
      }
    );

    this.visibleCategory[this.currentIndex] = this.options[this.currentIndex] = this.categoriesList[this.currentIndex].title;
    // console.log(this.categoriesList);
  }

  protected addSubcategory() {
    this.subcategoryAdd = {
      title: this.newSubcategoryTitle,
      color: this.newSubcategoryColor
    };

    this.newSubcategoryTitle = '';
    this.newSubcategoryColor = '';

    this.subcategoryService.addSubcategory(this.subcategoryAdd, this.activeCategory).subscribe(
      (value: SubcategoryModel) => {
        if(!this.activeCategory.subcategories) this.activeCategory.subcategories = [];
        this.activeCategory[this.currentIndex].subcategories.push(value);
        this.categoriesList[this.currentIndex].subcategories.push(value);
      }
    );
  }

  protected addCategory() {
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

  protected deleteSubcategory(subcategory: SubcategoryModel, index: number) {
    this.subcategoryService.deleteSubcategory(subcategory).subscribe();
    this.categoriesList[this.currentIndex].subcategories.splice(index, 1);
    this.activeCategory[this.currentIndex].subcategories.splice(index, 1);
    console.log(subcategory.title);
  }

  protected deleteCategory() {
    this.activeCategory.subcategories.forEach((value, index) => {
      this.deleteSubcategory(value, index);
    });

    this.categoryService.deleteCategory(this.activeCategory).subscribe();

    this.visibleCategory.splice(this.currentIndex, 1);
    this.options.splice(this.currentIndex, 1);
    this.categoriesList.splice(this.currentIndex, 1);
    console.log(this.errorInfo);
  }

  protected onSubmit(): void {

  }
}
