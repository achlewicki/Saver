import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'svr-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  protected logInClicked = false;

  constructor() { }

  ngOnInit() {
  }

  onLogInClick() {
    this.logInClicked = !this.logInClicked;
    console.log(this.logInClicked);
  }

}
