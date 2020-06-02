import { AccountService } from '#services/account-service/account.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OperationModel } from '#models/operations.model';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AccountModel } from '#models/account.model';
import { take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(
    private readonly accountService: AccountService
  ) {
    this.accountDeleted.subscribe( () => {
        console.log('sexy');
      }
    );
  }

  public activeView: ReplaySubject<ViewDetails> = new ReplaySubject<ViewDetails>(1);
  public activeAccount: ReplaySubject<AccountModel> = new ReplaySubject<AccountModel>(1);
  public operationAdded: Subject<OperationModel> = new Subject<OperationModel>();
  public accountAdded: Subject<AccountModel> = new Subject<AccountModel>();
  public accountChanged: Subject<AccountModel> = new Subject<AccountModel>();
  public accountDeleted: Subject<AccountModel> = new Subject<AccountModel>();

  public refreshActiveAccount(): void {
    this.activeAccount.pipe(take(1)).subscribe(
      activeAccount => {
        this.accountService.getAccountInfo(activeAccount.id).subscribe(
          account => this.activeAccount.next(account)
        );
      }
    );
  }

}

export interface ViewDetails {
  name: string;
  title: string;
  icon: IconDefinition;
}
