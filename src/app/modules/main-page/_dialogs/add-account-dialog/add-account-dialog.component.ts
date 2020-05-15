import { MainPageService } from '#services/main-page-service/main-page.service';
import { Observable } from 'rxjs';
import { AccountService } from '#services/account-service/account.service';
import { AccountModel } from '#models/account.model';
import { IconDefinition, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { accountIconsArray } from './account-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CurrencyModel } from '#models/currency.model';


@Component({
  selector: 'svr-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent implements OnInit {

  protected fGroup: FormGroup;
  protected dropdownActivated: boolean;
  protected iconslist = accountIconsArray;
  protected selectedIcon: IconDefinition;
  protected currencies$: Observable<CurrencyModel[]>;

  protected color = '#0F81CB';

  protected dialogState: 'active' | 'processing' | 'success' | 'error' = 'active';
  protected successIcon = faCheck;
  protected failureIcon = faTimes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddAccountDialogType,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddAccountDialogComponent, boolean>,
    private readonly accountService: AccountService,
    private readonly mainPageService: MainPageService
  ) {
    this.fGroup = this.fb.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      billingPeriod: [1, [Validators.required, Validators.min(1), Validators.max(29), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  ngOnInit(): void {
    this.dropdownActivated = false;
    this.selectedIcon = this.iconslist[0];
    this.currencies$ = this.accountService.getAllCurrencies();

    if (this.data.type === 'edit') {
      this.selectedIcon = this.iconslist.find(icon => icon.iconName === this.data.account.iconName);
      this.color = this.data.account.color;
      this.fGroup.get('name').setValue(this.data.account.name);
      this.fGroup.get('currency').setValue(this.data.account.currency);
      this.fGroup.get('billingPeriod').setValue(this.data.account.billingPeriodStart);
    }
  }

  protected activateDropdown(): void {
    this.dropdownActivated = !this.dropdownActivated;
  }

  protected closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }

  protected selectIcon(icon: IconDefinition): void {
    this.selectedIcon = icon;
  }

  protected submit(): void {
    this.dialogState = 'processing';
    if (this.data.type === 'add') {
      const account: AccountModel = {
        name: this.fGroup.get('name').value,
        color: this.color,
        iconName: this.selectedIcon.iconName,
        currency: this.fGroup.get('currency').value,
        billingPeriodStart: parseInt(this.fGroup.get('billingPeriod').value, 10),
      };

      this.accountService.createAccount(account).subscribe(
        result => {
          this.dialogState = 'success';
          this.mainPageService.accountAdded.next(result);
        },
        err => {
          this.dialogState = 'error';
          console.log(err);
        }
      );
    } else {
      const account = this.data.account;
      account.name = this.fGroup.get('name').value;
      account.color = this.color;
      account.iconName = this.selectedIcon.iconName;

      this.accountService.editAccount(account).subscribe(
        result => {
          this.dialogState = 'success';
          this.mainPageService.accountChanged.next(result);
        },
        err => {
          this.dialogState = 'error';
          console.log(err);
        }
      );
    }
  }
}

export interface AddAccountDialogType {
  type: 'add' | 'edit';
  account?: AccountModel;
}
