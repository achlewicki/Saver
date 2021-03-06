import {Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {UserInfoService} from '#services/user-info-service/user-info.service';
import {UserModel} from '#models/user.model';
import {Router} from '@angular/router';
import {AccountService} from '#services/account-service/account.service';

@Component({
  selector: 'svr-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {

  protected settingIcon = faCog;
  protected errorInfo = '';
  protected userInfo: UserModel;
  protected accountsQuantity = 0;
  protected userAchis = 0;
  protected userEvents = 0;
  protected imie = 'Imię';
  protected nazwisko = 'Nazwisko';

  constructor(
    private router: Router,
    private readonly dialogRef: MatDialogRef<UserInfoDialogComponent>,
    private readonly userInfoService: UserInfoService,
    private readonly accService: AccountService,
  ) { }

  ngOnInit() {
    this.userInfoService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.userInfo = response;
          if (this.userInfo.firstName !== '') {
            this.imie = this.userInfo.firstName;
            this.nazwisko = this.userInfo.lastName;
          }
        },
        (error) => {
          this.errorInfo = error;
        });
    this.userInfoService.getUserAchis(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.userAchis = response;
        }
      );
    this.userInfoService.getUserEvents(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.userEvents = response;
        }
      );
    this.accService.listAccounts(localStorage.getItem('user.id'))
      .subscribe(
        (response) => {
          this.accountsQuantity = response.length;
        }
    );
  }

  protected closeDialog() {
    this.dialogRef.close();
  }

  protected openUserSettings(): void {
    this.router.navigateByUrl('/main/user-settings');
    this.dialogRef.close();
  }
}
