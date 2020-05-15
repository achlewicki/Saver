import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '#services/account-service/account.service';
import { CurrencyModel } from '#models/currency.model';
import { Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Component, Output, EventEmitter } from '@angular/core';
import { accountIconsArray } from '#modules/main-page/_dialogs/add-account-dialog/account-icons';
import { AccountModel } from '#models/account.model';

@Component({
  selector: 'svr-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  @Output()
  protected next = new EventEmitter<AccountModel>();

  protected selectedIcon: IconDefinition;
  protected color: string;
  protected accountName: string;
  protected selectedCurrency: CurrencyModel;

  protected iconslist = accountIconsArray;
  protected currencies$: Observable<CurrencyModel[]>;

  protected initialize = true;
  protected fGroup: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private readonly fb: FormBuilder
  ) {
    this.color = '#0F81CB';

    this.selectedIcon = this.iconslist[0];
    this.currencies$ = this.accountService.getAllCurrencies();

    this.fGroup = this.fb.group({
      accountName: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  protected selectIcon(icon: IconDefinition): void {
    this.selectedIcon = icon;
  }

  protected completeStep(): void {
    if (this.fGroup.valid) {
      const account: AccountModel = {
        name: this.fGroup.get('accountName').value,
        color: this.color,
        budget: 1000,
        iconName: this.selectedIcon.iconName,
        currency: this.fGroup.get('currency').value,
        billingPeriodStart: 1
      };
      this.next.emit(account);
    }
  }
}
