import {SubcategoryModel} from '#models/subcategory.model';

export interface AccountHistoryModel {
  data: Date;
  wydatki: [
    {
      value: number;
      subcategory: SubcategoryModel
      date: Date;
      type: number;
    }
  ];
  przychody: number[];
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
