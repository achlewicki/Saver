import { OperationModel } from '#models/operations.model';
import { Component, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'svr-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {

  @Input()
  protected operation: OperationModel;

  protected descriptionBoxVisible: boolean;
  protected moment = moment;

  constructor() {
    this.descriptionBoxVisible = false;
  }

  protected descriptionClick(): void {
    this.descriptionBoxVisible = !this.descriptionBoxVisible;
  }

}
