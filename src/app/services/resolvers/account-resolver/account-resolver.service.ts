import { AccountService } from './../../account-service/account.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AccountModel } from '#models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountResolverService implements Resolve<AccountModel> {

  constructor(
    private readonly accService: AccountService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountModel> {
    return this.accService.getFirstAccount(parseInt(localStorage.getItem('user.id'), 10));
  }
}

