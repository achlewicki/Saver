import { AccountModel } from './account.model';
import { SubcategoryModel } from './subcategory.model';
import {EventModel} from '#models/event.model';

export interface OperationModel {
    title: string;
    description?: string;
    type: number;
    value: number;
    date: Date;
    intoAccount: string;
    guarantyDays?: number;
    distinction: string;
    file?: File;
    subcategory?: SubcategoryModel;
    account?: AccountModel;
    event?: number;
}

export interface GroupedOperations {
    date: string;
    operations: OperationModel[];
}
