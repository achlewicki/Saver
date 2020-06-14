import { InfoModel } from '#models/setting.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'svr-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {

  @Output()
  public next = new EventEmitter<InfoModel>();

  public fGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.fGroup = this.fb.group({
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      birthday: [''],
      sex: ['']
    });
  }

  protected skipStep(): void {
    this.next.emit(null);
  }

  protected completeStep(): void {
    const userInfo: InfoModel = {
      firstName: this.fGroup.get('firstname').value,
      lastName: this.fGroup.get('secondname').value,
      birthDate: this.fGroup.get('birthday').value || null,
      sex: parseInt(this.fGroup.get('sex').value, 10) || null
    };
    console.log(userInfo);
    this.next.emit(userInfo);
  }

}
