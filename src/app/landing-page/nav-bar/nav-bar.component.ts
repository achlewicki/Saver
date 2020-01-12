import {Component} from '@angular/core';

@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{
  protected logInClicked: boolean;
  protected registerClicked;

  constructor() {
    this.logInClicked = false;
    this.registerClicked = false;
  }

  onLogInClick() {
    this.logInClicked = !this.logInClicked;
    console.log(this.logInClicked);
  }

  onRegisterClick() {
    this.registerClicked = !this.registerClicked;
  }


}
