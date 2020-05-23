import { Router } from '@angular/router';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { MainPageService, ViewDetails } from '#services/main-page-service/main-page.service';
import { Component, OnInit } from '@angular/core';

import { faEnvelope, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import {MatDialog} from '@angular/material';
import {UserInfoDialogComponent} from '#modules/main-page/_dialogs/user-info-dialog/user-info-dialog.component';
import {NotificationDialogComponent} from '#modules/main-page/_dialogs/notification-dialog/notification-dialog.component'
import {UserInfoService} from '#services/user-info-service/user-info.service';
import {UserModel} from '#models/user.model';


@Component({
  selector: 'svr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected title: string;
  protected activeView: ViewDetails;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  protected user: UserModel;
  protected userName: string;
  protected error: string;

  constructor(
    private mpService: MainPageService,
    private readonly authService: AuthorisationService,
    private router: Router,
    private readonly dialogs: MatDialog,
    private readonly userInfoService: UserInfoService,
  ) {}

  ngOnInit() {
    this.mpService.activeView.subscribe(view => this.activeView = view);
    this.mpService.activeView.subscribe((view) => this.title = view.title);
    this.userInfoService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
      (response) => {
        this.user = response;
        this.userName = this.user.nickname;
      },
      (error) => {
        this.error = error;
      });
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  protected openUserInfoDialog(): void {
    this.dialogs.open(UserInfoDialogComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      maxHeight: '850px',
      // disableClose: true,
      position: {
        top: '65px',
        right: '50px'
      },
    });
  }

  protected openNotificationDialog(): void {
    this.dialogs.open(NotificationDialogComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      maxHeight: '850px',
      // disableClose: true,
      position: {
        top: '65px',
        right: '50px'
      },
    });
  }
}
