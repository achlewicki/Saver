import { LoginModel } from '#models/login.model';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})

export class LoginWindowComponent implements OnInit {
  protected loginForm: FormGroup;
  protected loginError: boolean;
  protected loginChceckPending: boolean;
  protected errorInfo: string;
  private redirectUrl: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: AuthorisationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginError = false;
    this.loginChceckPending = false;
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParams.redirectUrl;
    if (this.redirectUrl) { this.errorInfo = 'Musisz się zalogować'; }
  }

  protected onSubmit(): void {
    const user: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginChceckPending = true;
    this.loginService.login(user)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user.id', response.user.id.toString());
          this.errorInfo = '';
          if (response.firstLogin) {
            this.router.navigateByUrl('/first-login');
          } else if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
          } else {
            this.router.navigateByUrl('/main');
          }
        },
        (error: string) => {
          this.loginError = true;
          this.errorInfo = error;
          this.loginChceckPending = false;
        });
  }
}
