import { Component } from '@angular/core';
import { RegisterModel } from '#models/register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorisationService } from '#services/auth-service/authorisation.service';
import { Router } from '@angular/router';
import { BasicErrorStateMatcher } from '#modules/shared/error-matchers/basic.error-state-matcher';

@Component({
  selector: 'svr-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.scss']
})
export class RegisterWindowComponent {
  protected registerForm: FormGroup;
  protected registerError: boolean;
  protected errorInfo: string;

  matcher = new BasicErrorStateMatcher();

  constructor(
    private readonly fb: FormBuilder,
    private readonly registerService: AuthorisationService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$@$!%*?&])[A-Za-z0-9\d$#@$!%*?&].{7,}')]],
      password2: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
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
          this.router.navigateByUrl('/login');
        },
        (error) => {
          this.registerError = true;
          this.errorInfo = error;
          this.checkMessage()
        });
  }

  private checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('password2').value ? null : { notSame: true };
  }

  private checkMessage() {
    if (this.errorInfo === 'Nieprawidłowy login lub hasło') { this.errorInfo = 'Podany email jest już zarejestrowany'; }
  }
}
