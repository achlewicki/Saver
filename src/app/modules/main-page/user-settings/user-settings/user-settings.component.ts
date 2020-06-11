import {Component, OnInit } from '@angular/core';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingService} from '#services/setting-service/setting.service';
import {EmailModel, InfoModel, PasswordModel} from '#models/setting.model';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {UserInfoService} from '#services/user-info-service/user-info.service';
import { UserModel} from '#models/user.model';

@Component({
  selector: 'svr-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss', './user-settings-stylesheet.component.scss']
})
export class UserSettingsComponent implements OnInit {

  protected userInfo: UserModel = {
    id: 0,
    email: 'email',
    nickname: 'nickname',
    title: 'tytuł',
    firstName: 'imię',
    lastName: 'nazwisko',
    birthDate: null,
    sex: 0,
    registerDate: null,
    level: 1,
    experience: 100,
    isActive: true,
    isPremium: true,
    totalOperations: 0,
  };

  protected userEmail: FormControl;

  protected userNewPassword: FormControl;
  protected userConfirmPassword: FormControl;

  public fGroup: FormGroup;
  protected userFirstName: FormControl;
  protected userLastName: FormControl;
  protected userBirthDate: FormControl;
  protected userNickname: FormControl;
  protected sex: FormControl;
  protected userSex: number;

  protected error: boolean;
  protected errorInfo: string;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly settingService: SettingService,
    private readonly fb: FormBuilder,
    private readonly userInfoService: UserInfoService,
  ) {
    this.userEmail = new FormControl('', [Validators.required, Validators.email]);
    this.userNewPassword = new FormControl('',
      [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@$!%*?&])[A-Za-z0-9\d$#@$!%*?&].{7,}')]);
    this.userConfirmPassword = new FormControl('', [Validators.required]);

    this.userBirthDate = new FormControl(new Date());
    this.userFirstName = new FormControl('', [Validators.required]);
    this.userLastName = new FormControl('', [Validators.required]);
    this.userBirthDate = new FormControl('', [Validators.required]);
    this.userNickname = new FormControl('', [Validators.required]);
    this.error = false;
    this.errorInfo = '';

    this.fGroup = this.fb.group({
      sex: ['M', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.mainPageService.activeView.next({
      name: 'user-settings',
      title: 'Ustawienia',
      icon: faCog
    });
    this.userInfoService.getUserInfo(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.userInfo = response;
        },
        (error) => {
          this.errorInfo = error;
        });
  }

  SubmitEmailChange(): void {
    const email: EmailModel = {
      email: this.userEmail.value
    };
    this.settingService.changeEmail(email)
      .subscribe(
        (response) => {
        },
        (error) => {
          this.error = true;
          this.errorInfo = error;
        });
  }

  SubmitInfoChange(): void {
    if (this.userFirstName.value === '') { this.userFirstName.setValue(this.userInfo.firstName); }
    if (this.userLastName.value === '') { this.userLastName.setValue(this.userInfo.lastName); }
    if (this.userBirthDate.value === '') { this.userBirthDate.setValue(this.userInfo.birthDate); }
    if (this.userNickname.value === '') { this.userNickname.setValue(this.userInfo.nickname); }

    const userInfo: InfoModel = {
      firstName: this.userFirstName.value,
      lastName: this.userLastName.value,
      birthDate: this.userBirthDate.value,
      sex: this.userSex,
      nickname: this.userNickname.value,
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
