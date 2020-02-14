import { LoginModel } from '#models/login.model';
import { LoginService } from '#services/login-service/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})

export class LoginWindowComponent {
  @Output() closing: EventEmitter<any> = new EventEmitter();
  protected loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private onCloseLogInClicked() {
    this.closing.emit(false);
  }

  protected onSubmit(): void {
    const user: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loginService.verifyUser(user)
      .subscribe({
        next: x => {
          console.log(`Odebrano wiadomość z /login: \n ${JSON.stringify(x)}`);
          switch (x.status) {
            case 'Password or email is incorrect':
            case 'Login successful':
              // alert(x.status);
              this.closing.emit(false);
              this.router.navigateByUrl('/main');
              break;
            default:
              alert('Nieznany status ;(');
          }
        },
        error: x => console.log(`Wystąpił błąd z /login: ${JSON.stringify(x)}`),
        complete: () => console.log(`Ukończono połączenie z /login`)
      });
  }
}
