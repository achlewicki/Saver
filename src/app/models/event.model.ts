import { OperationModel } from '#models/operations.model';

export interface EventBasicModel {
    id?: number;
    title: string;
    dateFrom: Date;
    dateTo: Date;
    color: string;
    predefined: number;
}

export interface EventModel extends EventBasicModel {
    description?: string;
    value?: number;
    intoAccount: number;
    whenNotification?: Date;
    isRepeating: boolean;
    operations?: OperationModel[];
}
