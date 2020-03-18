import { Subcategory } from './subcategory.model';

export interface OperationModel {
    title: string;
    description: string;
    type: number;
    value: number;
    date: Date;
    intoAccount: boolean;
    guarantyDays: number;
    subcategory?: Subcategory;
}

export interface GroupedOperations {
    date: string;
    operations: OperationModel[];
}


