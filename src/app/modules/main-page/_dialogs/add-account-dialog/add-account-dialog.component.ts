import { Observable } from 'rxjs';
import { AccountService } from '#services/account-service/account.service';
import { AccountModel } from '#models/account.model';
import { IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';
import { accountIconsArray } from './account-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CurrencyModel } from '#models/currency.model';

@Component({
  selector: 'svr-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent {

  protected fGroup: FormGroup;
  protected dropdownActivated: boolean;
  protected iconslist = accountIconsArray;
  protected selectedIcon: IconDefinition;
  protected currencies$: Observable<CurrencyModel[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddAccountDialogComponent>,
    private readonly accountService: AccountService,
  ) {
    this.fGroup = this.fb.group({
      name: ['', Validators.required],
      color: [''],
      currency: ['', Validators.required]
    });

    this.dropdownActivated = false;
    this.selectedIcon = faHome;
    this.currencies$ = this.accountService.getAllCurrencies();
  }

  protected activateDropdown(): void {
    this.dropdownActivated = !this.dropdownActivated;
  }

  protected closeDialog(): void {
    this.dialogRef.close();
  }

  protected selectIcon(icon: IconDefinition): void {
    this.selectedIcon = icon;
  }

  protected submit(): void {
    const account: AccountModel = {
      name: this.fGroup.get('name').value,
      // icon: this.selectedIcon.iconName,
      color: this.fGroup.get('color').value
    };

    this.accountService.createAccount(account).subscribe(
      result => {

      },
      err => {

      }
    );
  }
}
