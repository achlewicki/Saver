import {CategoryModel} from '#models/category.model';

export interface SubcategoryModel {
  id: number;
  title: string;
  color: string;
  category?: CategoryModel;
}
