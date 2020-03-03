import { Component } from '@angular/core';
import { RegisterModel} from '#models/register.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {AuthorisationService} from '#services/auth-service/authorisation.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'svr-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.scss']
})
export class RegisterWindowComponent {
  protected registerForm: FormGroup;
  protected registerError: boolean;
  protected errorInfo: string;

  matcher = new MyErrorStateMatcher();

  constructor(
    private readonly fb: FormBuilder,
    private readonly registerService: AuthorisationService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@$!%*?&])[A-Za-z0-9\d$#@$!%*?&].{7,}')]],
      password2: ['', [Validators.required]]
    }, {validator: this.checkPasswords });
    this.registerError = false;
  }

  protected onSubmit(): void {
    const newUser: RegisterModel = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.registerService.register(newUser)
      .subscribe(
        () => {
          this.errorInfo = '';
          this.router.navigateByUrl('');
          console.log('Dodano użytkownika');
        },
        (error) => {
          this.registerError = true;
          this.errorInfo = error;
          console.log(this.errorInfo);
        });
    this.checkMessage();
  }

  private checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('password2').value ? {notSame: false} : { notSame: true };
  }

  private checkMessage(){
    if(this.errorInfo === 'Nieprawidłowy login lub hasło') this.errorInfo = 'Podany email jest już zarejestrowany';
  }
}
