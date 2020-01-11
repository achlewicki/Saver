import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {SharedService} from '../shared.service';

@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  protected logInClicked;
  protected registerClicked;
  public subscription;
  public ss;

  constructor(ss: SharedService) {
    this.logInClicked = false;
    this.registerClicked = false;
    this.ss = ss;
  }

  ngOnInit() {
    this.subscription = this.ss.getEmittedValue()
      .subscribe(item => this.logInClicked = item);
  }

  onLogInClick() {
    this.logInClicked = !this.logInClicked;
    console.log(this.logInClicked);
  }

  onRegisterClick() {
    this.registerClicked = !this.registerClicked;
  }


}
