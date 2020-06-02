import { SubcategoryModel } from '#models/subcategory.model';

export interface InstalmentBasicModel {
  id?: number;
  title: string;
  dateFrom: Date;
  dateTo?: Date;
  instalmentDates: number;
  paidValue?: number;
  totalValue: number;
  subcategory?: SubcategoryModel;
  intoAccount: number;
}

export interface InstalmentExtendedModel extends InstalmentBasicModel {
  description: string;
  elements?: InstalmentElementModel[];
}

export interface InstalmentElementModel {
  date: Date;
  value: number;
  paid: boolean;
}

export interface InstalmentDTO {
  title: string;
  dateFrom: Date;
  description: string;
  value: number;
  numOfInstalment: number;
  intoAccount: number;
}
