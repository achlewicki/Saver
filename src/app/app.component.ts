import { Component } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'svr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';

  constructor() {
    moment.locale('pl');
  }
}
