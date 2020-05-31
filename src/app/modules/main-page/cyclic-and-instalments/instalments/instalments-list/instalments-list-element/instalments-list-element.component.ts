import { InstalmentBasicModel } from '#models/instalment.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'svr-instalments-list-element',
  templateUrl: './instalments-list-element.component.html',
  styleUrls: ['./instalments-list-element.component.scss']
})
export class InstalmentsListElementComponent {
  @Input() public instalment: InstalmentBasicModel;
  @Output() public selected = new EventEmitter<InstalmentBasicModel>();

  protected select(): void {
    this.selected.emit(this.instalment);
  }
}
