import { LoginModel } from '#models/login.model';
import { LoginService } from '#services/login-service/login.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})

export class LoginWindowComponent {
  @Output()
  public closing: EventEmitter<boolean> = new EventEmitter();
  protected loginForm: FormGroup;
  protected loginError: boolean;
  protected loginChceckPending: boolean;
  protected errorInfo: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginError = false;
    this.loginChceckPending = false;
  }

  protected onCloseLogInClicked(): void {
    this.closing.emit(false);
  }

  protected onSubmit(): void {
    const user: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginChceckPending = true;
    this.loginService.verifyUser(user)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          console.log(localStorage.getItem('token'));
          this.loginChceckPending = false;
          this.errorInfo = '';
        },
        (error) => {
          this.loginError = true;
          this.errorInfo = error;
          this.loginChceckPending = false;
        });
  }
}
