export interface AccountModel {
  id?: number;
  name: string;
  color: string;
  budget?: number;
  balance?: number;
  iconName: string;
  billingPeriodStart: number;
  currency: CurrencyModel;
}

export interface AccountStatistics {
  totalCyclics: number;
  totalCyclicsBill: number;
}
