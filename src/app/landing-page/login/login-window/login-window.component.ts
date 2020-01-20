import { LoginModel } from './../../services/login-service/login.service';
import { LoginService } from './../../services/login-service/login.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'svr-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  protected loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  private onCloseLogInClicked() {
    this.fire.emit(false);
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
            alert(x.status);
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
