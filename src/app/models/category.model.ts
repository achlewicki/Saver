import {SubcategoryModel} from '#models/subcategory.model';

export interface CategoryModel {
  id?: number;
  title: string;
  color: string;
  limit: number;
  subcategories?: SubcategoryModel[];
}
