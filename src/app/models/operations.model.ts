import { SubcategoryModel } from './subcategory.model';

export interface OperationModel {
    title: string;
    description: string;
    type: number;
    value: number;
    date: Date;
    intoAccount: boolean;
    guarantyDays: number;
    subcategory?: SubcategoryModel;
}

export interface GroupedOperations {
    date: string;
    operations: OperationModel[];
}


