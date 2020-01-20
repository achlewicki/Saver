import {Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  protected loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  private onCloseLogInClicked() {
    this.fire.emit(false);
  }

  protected onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
