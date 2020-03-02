import { Component } from '@angular/core';

@Component({
  selector: 'svr-landing-nav-bar',
  templateUrl: './landing-nav-bar.component.html',
  styleUrls: ['./landing-nav-bar.component.scss']
})
export class LandingNavBarComponent {
  protected logInClicked: boolean;

  constructor() {
    this.logInClicked = false;
  }

  onLogInClick(): void {
    this.logInClicked = !this.logInClicked;
  }
}
