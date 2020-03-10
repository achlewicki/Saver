import {SubCategoryModel} from '#models/subcategory.model';

export interface CategoryModel {
  id: number;
  title: string;
  color: string;
  limit: number;
  subcategories: SubCategoryModel[];
}
