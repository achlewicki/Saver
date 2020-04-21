import {Component, Inject, OnInit} from '@angular/core';
import { SubcategoryModel } from '#models/subcategory.model';
import { CategoryModel } from '#models/category.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '#services/subcategory-service/subcategory.service';
import { CategoryService } from '#services/category-service/category.service';
import { SubcategoryAddModel } from '#models/subcategoryAdd.model';
import { BasicErrorStateMatcher } from '#shared/error-matchers/basic.error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CategoriesComponent} from '#modules/main-page/categories/categories/categories.component';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {faAd, faSave} from '@fortawesome/free-solid-svg-icons';
import {last} from 'rxjs/operators';
import {CategoryAddModel} from '#models/categoryAdd.model';

export interface DialogData {
  category: CategoryModel;
  operation?: string;
  titles?: string [];
}

@Component({
  selector: 'svr-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  private category: CategoryModel;
  private editingForm: FormGroup;
  private addingForm: FormGroup;
  private matcher = new BasicErrorStateMatcher();
  private categoryColor: string;
  private subcategoryColor: string;
  private addingOperation: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.category = this.data.category;
    this.category.id === undefined ? this.addingOperation = true : this.addingOperation = false;

    this.editingForm = this.fb.group({
      categoryTitle: [this.category.title, [Validators.required]],
      categoryColor: [this.category.color, [Validators.required]],
      categoryLimit: [this.category.limit, [Validators.required, Validators.pattern('([1-9]+[0-9]*)')]],
      subcategories: this.fb.array([])
    });

    this.category.subcategories.forEach(value2 => {
      const items = this.editingForm.get('subcategories') as FormArray;
      items.push(this.createItem(value2));
    });

    this.addingForm = this.fb.group({
      newSubcategoryTitle: ['Nowa Subkategoria', [Validators.required]],
      newSubcategoryColor: ['blue', [Validators.required]]
    });

    this.subcategoryColor = 'blue';
  }

  private createItem(subcategory: SubcategoryModel): FormGroup {
    return this.fb.group({
      id: subcategory.id,
      title: [subcategory.title, [Validators.required]],
      color: [subcategory.color, [Validators.required]]
    });
  }

  private updateSubcategory(subcategory: SubcategoryModel, index: number) {
    if (this.editingForm.valid) {
      const updateSubcategory: SubcategoryModel = {
        id: subcategory.id,
        title: this.editingForm.value.subcategories[index].title,
        color: this.editingForm.value.subcategories[index].color
      };

      const subcategoriesTitle: string [] = [];
      this.category.subcategories.forEach(value => subcategoriesTitle.push(value.title));
      subcategoriesTitle.splice(index, 1);
      console.log(subcategoriesTitle);
      if (!subcategoriesTitle.find(value => value === updateSubcategory.title)) {
        this.subcategoryService.updateSubcategory(updateSubcategory).subscribe();
        this.category.subcategories[index] = updateSubcategory;
      } else { alert('Subkategoria o takiej nazwie już istnieje. Podaj inną nazwę'); }
    }
  }

  private updateCategory() {
    if (this.editingForm.valid) {
      const updateCategory: CategoryModel = {
        id: this.category.id,
        title: this.editingForm.value.categoryTitle,
        color: this.editingForm.value.categoryColor,
        limit: this.editingForm.value.categoryLimit,
        subcategories: this.category.subcategories
      };
      console.log('po update:');
      console.log(updateCategory);

      if (!this.data.titles.find(value => updateCategory.title === value)) {
        const index = this.data.titles.findIndex(value => this.category.title === value);
        this.data.titles[index] = updateCategory.title;
        this.categoryService.updateCategory(updateCategory).subscribe();
        this.category = updateCategory;
      } else {
        alert('Kategoria o takiej nazwie już istnieje. Podaj inną nazwę');
      }
    }
  }

  private addSubcategory() {
    if (this.addingForm.valid) {
      const newSubcategory: SubcategoryAddModel = {
        title: this.addingForm.value.newSubcategoryTitle,
        color: this.addingForm.value.newSubcategoryColor
      };

      this.addingForm.setValue({newSubcategoryTitle: 'Nowa Subkategoria', newSubcategoryColor: 'blue'});
      // TODO Backend zwraca tylko id!!!!
      if (!this.category.subcategories.find(value => newSubcategory.title === value.title)) {
        this.subcategoryService.addSubcategory(newSubcategory, this.category).subscribe(
          (value: SubcategoryModel) => {
            const subcategoryAdded: SubcategoryModel = {
              id: value.id,
              title: newSubcategory.title,
              color: newSubcategory.color
            };
            this.category.subcategories.push(subcategoryAdded);
            const items = this.editingForm.get('subcategories') as FormArray;
            items.push(this.createItem(subcategoryAdded));
          }
        );
      } else { alert('Subkategoria o takiej nazwie już istnieje. Podaj inną nazwę'); }
    }
  }

  private deleteSubcategory(subcategory: SubcategoryModel, index: number) {
    this.subcategoryService.deleteSubcategory(subcategory).subscribe();
    const items = this.editingForm.get('subcategories') as FormArray;
    items.removeAt(index);
    if (index !== undefined) { this.category.subcategories.splice(index, 1); }
  }

  private addCategory() {
    if (this.editingForm.valid) {
      if (!this.data.titles.find(value => value === this.editingForm.get('categoryTitle').value)) {
        const newCategory: CategoryAddModel = {
          title: this.editingForm.get('categoryTitle').value,
          color: this.editingForm.get('categoryColor').value,
          limit: this.editingForm.get('categoryLimit').value,
        };

        this.categoryService.addCategory(newCategory).subscribe(value => {
          this.category = value;
          this.category.subcategories = [];
          console.log(this.category);
        });
        this.addingOperation = false;
      } else { alert('Taka kategoria już istnieje. Podaj inną nazwę'); }
    }
  }

  private deleteCategory() {
    const len = this.category.subcategories.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        this.deleteSubcategory(this.category.subcategories.pop(), undefined);
      }
    }

    this.categoryService.deleteCategory(this.category).subscribe();
    this.closeDialog('delete');
  }

  protected closeDialog(op: string) {
    // TODO Prevent from closing when form is dirty - Dialog
    if (!this.addingOperation) {
      let updatedCategory: CategoryModel;
      updatedCategory = this.category;
      console.log(updatedCategory);
      const answer: DialogData = {category: updatedCategory, operation: op};
      this.dialogRef.close(answer);
    } else {this.dialogRef.close({operation: 'cancel'}); }
  }
}
