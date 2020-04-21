import {Component, OnInit, Output} from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import {UserInfoService} from '#services/user-info-service/user-info.service';
import {UserModel} from '#models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'svr-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {

  protected settingIcon = faCog;
  protected errorInfo = '';
  protected userInfo: UserModel;

  constructor(
    private router: Router,
    private readonly dialogRef: MatDialogRef<UserInfoDialogComponent>,
    private readonly userInfoService: UserInfoService,
  ) { }

  ngOnInit() {
    this.userInfoService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.userInfo = response;
        },
        (error) => {
          this.errorInfo = error;
        });
  }

  protected closeDialog() {
    this.dialogRef.close();
  }

  protected openUserSettings(): void {
    this.router.navigateByUrl('/main/user-settings');
    this.dialogRef.close();
  }
}
