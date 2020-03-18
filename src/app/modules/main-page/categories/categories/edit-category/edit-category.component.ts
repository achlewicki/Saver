import {Component} from '@angular/core';
import {SubcategoryModel} from '#models/subcategory.model';
import {CategoryModel} from '#models/category.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubcategoryService} from '#services/subcategory-service/subcategory.service';
import {CategoryService} from '#services/category-service/category.service';
import {SubcategoryAddModel} from '#models/subcategoryAdd.model';
import {ActivatedRoute} from '@angular/router';
import {MyErrorStateMatcher} from '#modules/landing-page/register/register-window/register-window.component';


@Component({
  selector: 'svr-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  private categoryId: number;
  private editingForm: FormGroup;
  private addingForm: FormGroup;
  private category: CategoryModel;
  private matcher = new MyErrorStateMatcher();

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly route: ActivatedRoute
  ) {
    this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.addingForm = this.fb.group({
      newSubcategoryTitle: [],
      newSubcategoryColor: []
    });

    this.categoryService.getCategoryInfo(this.categoryId).subscribe(
      (value) => {
        this.category = value[0];
        this.editingForm = this.fb.group({
          categoryTitle: [this.category.title, [Validators.required]],
          categoryColor: [this.category.color, [Validators.required]],
          categoryLimit: [this.category.limit, [Validators.required]],
          subcategories: this.fb.array([])
        });
        this.category.subcategories.forEach(value1 => {
          const items = this.editingForm.get('subcategories') as FormArray;
          items.push(this.createItem(value1));
        });
        console.log(this.editingForm.get('subcategories'));
      }
    );
  }

  private createItem(subcategory: SubcategoryModel): FormGroup {
    return this.fb.group({
      id: subcategory.id,
      title: [subcategory.title, [Validators.required]],
      color: [subcategory.color, [Validators.required]]
    });
  }

  private updateSubcategory(subcategory: SubcategoryModel, index: number) {
    const updateSubcategory: SubcategoryModel = {
      id: subcategory.id,
      title: this.editingForm.value.subcategories[index].title,
      color: this.editingForm.value.subcategories[index].color
    };
    this.subcategoryService.updateSubcategory(updateSubcategory).subscribe();
  }

  private updateCategory() {
    const updateCategory: CategoryModel = {
      id: this.category.id,
      title: this.editingForm.value.categoryTitle,
      color: this.editingForm.value.categoryColor,
      limit: this.editingForm.value.limit,
      subcategories: this.category.subcategories
    };

    this.categoryService.updateCategory(updateCategory).subscribe();
  }

  private addSubcategory() {
    const newSubcategory: SubcategoryAddModel = {
      title: this.addingForm.value.newSubcategoryTitle,
      color: this.addingForm.value.newSubcategoryColor
    };

    this.addingForm.reset();

    // TODO Backend zwraca tylko id!!!!

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
  }

  private deleteSubcategory(subcategory: SubcategoryModel, index: number) {
    this.subcategoryService.deleteSubcategory(subcategory).subscribe();
    const items = this.editingForm.get('subcategories') as FormArray;
    items.removeAt(index);
  }

  private deleteCategory() {
    this.category.subcategories.forEach((value, index) => {
      this.deleteSubcategory(value, index);
    });

    this.categoryService.deleteCategory(this.category).subscribe();
  }
}
