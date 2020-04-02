import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'svr-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  public fGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.fGroup = this.fb.group({
      firstname: [''],
      secondname: [''],
      birthday: [''],
      sex: ['']
    });
  }

}
