import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from '#services/category-service/category.service';
import { CategoryModel } from '#models/category.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EditCategoryComponent} from '#dialogs/edit-category/edit-category.component';

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

  constructor(
    private readonly mpService: MainPageService,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly dialogs: MatDialog
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.categoriesList = response;
        this.categoriesList.forEach((value) => {
          this.options.push(value.title);
        });
        this.visibleCategory = this.options;
        // console.log(this.categoriesList);
      }
    );

    this.mpService.activeView.next({
      name: 'categories',
      title: 'Kategorie',
      icon: 'clipboard'
    });
    //
    // this.route.data
    //   .pipe(map(data => data.viewname))
    //   .subscribe((x) => this.hservice.viewTitle.next(x));

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
    return !!this.visibleCategory.find(value => value === title) ;
  }

  private openEditCategoryDialog(id: number): void {
    const categoriesTitle: string [] = [];
    this.categoriesList.forEach(value => categoriesTitle.push(value.title));
    categoriesTitle.splice(categoriesTitle.findIndex(value => value === this.categoriesList[id].title), 1);
    const editDialog = this.dialogs.open(EditCategoryComponent, {
      data: {
        category: this.categoriesList[id],
        operation: 'editing',
        titles: categoriesTitle
      },
      hasBackdrop: true,
      maxHeight: '850px',
      disableClose: true // with false there are issues with update
    });

    editDialog.afterClosed().subscribe(value => {
      switch (value.operation) {
        case 'update':
          this.categoriesList.splice(id, 1, value.category);
          console.log(this.categoriesList);
          break;

        case 'delete':
          this.categoriesList.splice(id, 1);
          break;

        case 'cancel':
          break;
      }
      this.ngOnInit();
    });
  }

  private addCategory(): void {
    if (this.categoriesList.length <= 8) {
      const newCategory: CategoryModel = {title: 'Nowa kategoria', color: 'blue', limit: 1000, subcategories: [] = []};
      const categoriesTitle: string [] = [];
      this.categoriesList.forEach(value => categoriesTitle.push(value.title));
      const addDialog = this.dialogs.open(EditCategoryComponent, {
        data: {
          category: newCategory,
          operation: 'adding',
          titles: categoriesTitle
        },
        hasBackdrop: true,
        maxHeight: '850px',
        disableClose: true // with false there are issues with update
      });

      addDialog.afterClosed().subscribe(value => {
        if (value.operation === 'close') {this.categoriesList.push(value.category); }
        console.log(this.categoriesList);
        this.ngOnInit();
      });
    } else { alert('Osiągnięto limit możliwych do posiadania kategorii wynoszący 8.'); }
  }
}
