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
  protected registerForm;

  matcher = new MyErrorStateMatcher();

  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.get('email').value);
  }
}
