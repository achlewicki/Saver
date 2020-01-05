import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  protected logInClicked;

  constructor() {
    this.logInClicked = false;
  }

  onLogInClick() {
    this.logInClicked = !this.logInClicked;
    console.log(this.logInClicked);
  }
}
