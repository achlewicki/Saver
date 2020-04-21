import { OperationModel } from '#models/operations.model';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AccountModel } from '#models/account.model';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public activeView: ReplaySubject<ViewDetails> = new ReplaySubject<ViewDetails>(1);
  public activeAccount: ReplaySubject<AccountModel> = new ReplaySubject<AccountModel>(1);
  public operationAdded: Subject<OperationModel> = new Subject<OperationModel>();

}

interface ViewDetails {
  name: string;
  title: string;
  icon: string;
}
