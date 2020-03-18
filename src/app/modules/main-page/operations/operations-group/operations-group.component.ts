import { Component, Input, OnChanges } from '@angular/core';
import { GroupedOperations } from '#models/operations.model';

import * as moment from 'moment';
@Component({
  selector: 'svr-operations-group',
  templateUrl: './operations-group.component.html',
  styleUrls: ['./operations-group.component.scss']
})
export class OperationsGroupComponent implements OnChanges {

  @Input()
  protected group: GroupedOperations;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.group.date === moment().format('DD.MM.YYYY')) { this.group.date = 'Dziś'; }
    if (this.group.date === moment().add(1, 'days').format('DD.MM.YYYY')) { this.group.date = 'Wczoraj'; }
  }
}
