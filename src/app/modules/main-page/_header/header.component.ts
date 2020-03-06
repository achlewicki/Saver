import { Router } from '@angular/router';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { HeaderService } from '#services/header-service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected title: string;

  constructor(
    private hservice: HeaderService,
    private readonly authService: AuthorisationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.hservice.viewTitle.subscribe((title: string) => this.title = title);
  }

  protected toggleNavBar(): void {
    this.hservice.toggleNavBar();
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
