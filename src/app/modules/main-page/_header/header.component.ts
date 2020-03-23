import { Router } from '@angular/router';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit } from '@angular/core';

import { faEnvelope, faBell, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {NavAccountListComponent} from '#modules/main-page/_nav-bar/nav-account-list/nav-account-list.component';

@Component({
  selector: 'svr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected title: string;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faBars = faBars;
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
}
