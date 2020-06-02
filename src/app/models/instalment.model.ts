import { SubcategoryModel } from '#models/subcategory.model';

// Domyślny model dla getInstalmentsByAccount, endpoint np: instalments/:accID albo account/:id/instalments
export interface InstalmentBasicModel {
  id?: number;
  title: string;
  dateFrom: Date;
  dateTo?: Date;
  instalmentDates: number; // liczba rat (liczba miesięcy na ile kredyt jest brany)
  paidValue?: number;
  totalValue: number;
  subcategory?: SubcategoryModel;
  intoAccount: number;
}

// Model dla getInstalment, endpoint np: instalment/:id
export interface InstalmentExtendedModel extends InstalmentBasicModel {
  description: string;
  elements?: InstalmentElementModel[]; // najlepiej posortowane względem daty
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

/*
  Do utworzenia podaje:

  title: string;
  description: string; // opcjonalnie (przy opcjonalnym wysyłam: '')
  dateFrom: Date;
  instalmentDates: number; // liczba rat (liczba miesięcy na ile kredyt jest brany)
  totalValue: number; // całkowita wartość kredytu
  subcategory: SubcategoryModel;
  intoAccount: number;

*/
