import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService} from '../../services/shared.service';


@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent {

  protected loginForm: FormGroup;
  protected ss;

  constructor(private readonly fb: FormBuilder, ss: SharedService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.ss = ss;
   }

  private onCloseLogInClicked() {
    this.ss.change();
  }

  protected onSubmit(): void {
    console.log(this.loginForm.value);
  }

}
