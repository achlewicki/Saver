import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AccountModel } from '#models/account.model';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  public activeView: ReplaySubject<ViewDetails> = new ReplaySubject<ViewDetails>(1);
  public activeAccount: ReplaySubject<AccountModel> = new ReplaySubject<AccountModel>(1);

}

interface ViewDetails {
  name: string;
  title: string;
  icon: string;
}
