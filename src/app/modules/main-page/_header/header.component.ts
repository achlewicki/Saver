import { Router } from '@angular/router';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import {Component, Input, OnInit} from '@angular/core';

import { faEnvelope, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'svr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected title: string;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(
    private mpservice: MainPageService,
    private readonly authService: AuthorisationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.mpservice.activeView.subscribe((view) => this.title = view.title);
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  protected userSettings(): void {
    this.router.navigateByUrl('/main/user-settings');
  }
}
