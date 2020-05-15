import { Router } from '@angular/router';
import { SettingService } from '#services/setting-service/setting.service';
import { AccountService } from '#services/account-service/account.service';
import { forkJoin, of } from 'rxjs';
import { InfoModel } from '#models/setting.model';
import { AccountModel } from '#models/account.model';
import { Component } from '@angular/core';

@Component({
  selector: 'svr-first-login-core',
  templateUrl: './first-login-core.component.html',
  styleUrls: ['./first-login-core.component.scss']
})
export class FirstLoginCoreComponent {

  protected firstAccount: AccountModel;
  protected monthDay: number;
  protected userData: InfoModel;

  protected completeRequestState: 'pending' | 'completed' | 'error' = 'pending';

  constructor(
    private readonly accoutService: AccountService,
    private readonly userSettingsService: SettingService,
    private readonly router: Router
  ) { }

  protected saveStepperForm(): void {
    this.completeRequestState = 'pending';
    this.firstAccount.billingPeriodStart = this.monthDay;
    const completeRequest$ = forkJoin(
      this.accoutService.createAccount(this.firstAccount),
      this.userData ? this.userSettingsService.changeInfo(this.userData) : of({})
    );
    completeRequest$.subscribe(
      () => {
        this.completeRequestState = 'completed';
      },
      error => {
        this.completeRequestState = 'error';
      }
    );
  }

  protected goToMainApp(): void {
    this.router.navigateByUrl('/main');
  }

}
