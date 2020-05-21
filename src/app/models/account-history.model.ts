import {SubcategoryModel} from '#models/subcategory.model';

export interface AccountHistoryModel {
  date: Date;
  outcomes: [
    {
      value: number;
      subcategory: SubcategoryModel
      date: Date;
      type: number;
    }
  ];
  incomes: number[];
  report: [
    {
      balance: number;
      budget: number;
      minExpenditure: number;
      maxExpenditure: number;
      avgExpenditure: number;
      numOfOperations: number;
    }
  ];
}
