import { OperationModel } from '#models/operations.model';
import { Component, Input } from '@angular/core';

import { faFile, faCertificate, faChevronDown, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent {

  @Input()
  protected operation: OperationModel;

  protected descriptionBoxVisible: boolean;

  protected fileIcon = faFile;
  protected guaranteeIcon = faCertificate;
  protected dropIcon = faChevronDown;
  protected descriptionIcon = faAlignLeft;

  constructor() {
    this.descriptionBoxVisible = false;
  }

  protected descriptionClick(): void {
    this.descriptionBoxVisible = !this.descriptionBoxVisible;
  }

  protected expectedDate(dateFrom: Date, months: number): Date {
    const expected = new Date(dateFrom);
    expected.setMonth(expected.getMonth() + months);
    return expected;
  }

}
