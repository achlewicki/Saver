import { Component } from '@angular/core';
import { RegisterModel} from '../register-model/register-model';

@Component({
  selector: 'svr-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.scss']
})
export class RegisterWindowComponent {
  protected registerModel: RegisterModel;
  constructor() { }


  registerSubmit() {

  }
}
