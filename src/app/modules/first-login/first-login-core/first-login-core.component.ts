import { UserDataComponent } from './../user-data/user-data.component';
import { FormGroup } from '@angular/forms';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'svr-first-login-core',
  templateUrl: './first-login-core.component.html',
  styleUrls: ['./first-login-core.component.scss']
})
export class FirstLoginCoreComponent implements AfterViewInit {

  @ViewChild(UserDataComponent, { static: false })
  private userForm: UserDataComponent;

  protected userDataGroup: Promise<FormGroup>;

  ngAfterViewInit() {
    this.userDataGroup = new Promise(() => this.userForm.fGroup);
  }
}
