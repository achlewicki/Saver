import { LoginService } from './../../services/login-service/login.service';
import { LoginModel } from './../login-model/login-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent implements OnInit {

  protected loginModel: LoginModel = new LoginModel();
  protected errorOccurred: boolean;
  protected errorMessage: string;

  constructor(
    private loginService: LoginService
  ) {
    this.errorOccurred = false;
   }

  ngOnInit() {
  }

  public loginSubmit() {
    if (this.loginModel.login && this.loginModel.password) {
      this.loginService.verifyUser(this.loginModel).subscribe(
        (e) => {
          console.log(`e:${e}`);
          if (e) {
            console.log(`Login: ${e.login} Haslo: ${e.password}`);
            // this.loginModel = new LoginModel();
            this.errorOccurred = false;
            alert('Logowanie poprawne');
          } else {
            this.errorOccurred = true;
            this.errorMessage = 'Błędny login lub hasło!';
          }
        },
        (err) => {
          this.errorOccurred = true;
          this.errorMessage = 'Wystąpił błąd :(';
        }
      );

      // console.log(`login:\t\t${this.loginModel.login}\npassword:\t${this.loginModel.password}`);
    } else {
      this.errorOccurred = true;
      this.errorMessage = 'Wpisz login i hasło!';
    }
  }

}
