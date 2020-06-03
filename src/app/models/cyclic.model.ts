import { SubcategoryModel } from '#models/subcategory.model';


export interface CyclicModel {
  id?: number;
  title: string;
  description: string;
  value: number;
  howOften: number;
  nextDate?: Date;
  subcategory?: SubcategoryModel;
  type?: number;
  intoAccount?: number;
  // endDate: Date;
  summaryValue?: number;
}
