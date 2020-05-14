import {AccountModel} from '#models/account.model';
import {AccountHistoryModel} from '#models/account-history.model';

export interface AccountAndAccountHistoryModel {
 account: AccountModel;
 accountHistory: AccountHistoryModel[];
}
