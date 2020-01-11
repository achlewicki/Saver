import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

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


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])


  matcher = new MyErrorStateMatcher();

  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', this.emailFormControl],
      password: ['', this.passwordFormControl]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
