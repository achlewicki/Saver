import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'svr-billing-period',
  templateUrl: './billing-period.component.html',
  styleUrls: ['./billing-period.component.scss']
})
export class BillingPeriodComponent {

  @Output()
  public next = new EventEmitter<number>();

  protected fGroup = new FormGroup({
    monthDay: new FormControl(1, [Validators.min(1), Validators.max(29), Validators.pattern(/^[0-9]*$/)])
  });

  protected submit(): void {
    if (this.fGroup.valid && this.fGroup.get('monthDay').value) {
      this.next.emit(this.fGroup.get('monthDay').value);
    }
  }

}
