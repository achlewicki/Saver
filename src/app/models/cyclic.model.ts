import {SubcategoryModel} from '#models/subcategory.model';

// Domyślny model dla getCyclicsByAccount, endpoint np. /cyclic/getAll/:accountID (zwrot w postaci tablicy modeli => CyclicModel[])
export interface CyclicModel {
  id?: number;
  title: string;
  description: string;
  value: number;
  howOften: number;
  nextDate: Date;
  subcategory?: SubcategoryModel;
  type?: number;
  intoAccount?: number;
  endDate: Date;
  summaryValue?: number; // suma kwot wszystkich operacji składających się na tą cykliczną opłatę
}

// Tworzenie nowej operacji cyklicznej np. /cyclic/new/:accountID
/*
  title: number;
  description: string;
  value: number;
  howOften: number;
  nextDate: Date;
  subcategory: SubcategoryModel;
  type: number;
  intoAccount: number;
  endDate: Date;
 */

