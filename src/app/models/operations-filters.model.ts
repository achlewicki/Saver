export interface OperationFilters {
    dateFrom?: Date;
    dateTo?: Date;
    type?: string[];
    haveFile?: boolean;
    haveGuaranty?: boolean;
    categories?: number[];
    incomes?: boolean;
    outcomes?: boolean;
    operationType?: 'all' | 'in' | 'out';
}
