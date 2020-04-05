import {Component, OnInit } from '@angular/core';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {FormControl, Validators} from '@angular/forms';
import {SettingService} from '#services/setting-service/setting.service';
import {EmailModel, InfoModel, PasswordModel} from '#models/setting.model';

@Component({
  selector: 'svr-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss', './user-settings-stylesheet.component.scss']
})
export class UserSettingsComponent implements OnInit {

  protected userEmail: FormControl;

  protected userNewPassword: FormControl;
  protected userConfirmPassword: FormControl;

  protected userFirstName: FormControl;
  protected userLastName: FormControl;
  protected userBirthDate: FormControl;
  protected userNickname: FormControl;
  protected userSex: number;

  protected error: boolean;
  protected errorInfo: string;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly settingService: SettingService,
  ) {
    this.userEmail = new FormControl('', [Validators.required, Validators.email]);
    this.userNewPassword = new FormControl('',
      [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@$!%*?&])[A-Za-z0-9\d$#@$!%*?&].{7,}')]);
    this.userConfirmPassword = new FormControl('', [Validators.required]);

    this.userBirthDate = new FormControl(new Date());
    this.userFirstName = new FormControl('');
    this.userLastName = new FormControl('');
    this.userBirthDate = new FormControl('');
    this.error = false;
    this.errorInfo = '';
  }

  ngOnInit(): void {
    this.mainPageService.activeView.next({
      name: 'user-settings',
      title: 'Ustawienia',
      icon: 'null'
    });
  }

  SubmitEmailChange(): void {
    const email: EmailModel = {
      email: this.userEmail.value
    };
    this.settingService.changeEmail(email)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.error = true;
          this.errorInfo = error;
          console.log(this.errorInfo);
        });
  }

  SubmitInfoChange(): void {
    const userInfo: InfoModel = {
      firstName: this.userFirstName.value,
      lastName: this.userLastName.value,
      birthDate: this.userBirthDate.value,
      sex: this.userSex,
    };
    this.settingService.changeInfo(userInfo)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.error = true;
          this.errorInfo = error;
          console.log(this.errorInfo);
        });
  }

  SubmitPasswordChange(): void {
    if (this.userNewPassword.value === this.userConfirmPassword.value) {
      const password: PasswordModel = {
        password: this.userConfirmPassword.value,
      };
      this.settingService.changePassword(password)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            this.error = true;
            this.errorInfo = error;
            console.log(this.errorInfo);
          });
    } else {
      console.log('Hasła muszą być takie same');
    }
  }

  onFemaleSexClick(): void {
    this.userSex = 0;
  }

  onMaleSexClick(): void {
    this.userSex = 1;
  }
}
