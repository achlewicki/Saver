import { Observable } from 'rxjs';
import { Component, Input, OnChanges } from '@angular/core';
import { InstalmentsService } from '#services/instalments-service/instalments.service';
import { InstalmentExtendedModel, InstalmentElementModel } from '#models/instalment.model';
import { faCoins, faBookmark, faAlignLeft, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'svr-instalments-list-details',
  templateUrl: './instalments-list-details.component.html',
  styleUrls: ['./instalments-list-details.component.scss']
})
export class InstalmentsListDetailsComponent implements OnChanges {
  @Input() public instalmentId: number;
  protected instalment$: Observable<InstalmentExtendedModel>;

  protected coinsIcon = faCoins;
  protected titleIcon = faBookmark;
  protected descriptionIcon = faAlignLeft;
  protected timeIcon = faHourglassHalf;

  private placeholder = new Date('01-01-1970');

  constructor(
    private readonly instalmentsService: InstalmentsService
  ) { }

  ngOnChanges(): void {
    if (this.instalmentId) {
      this.instalment$ = this.instalmentsService.getInstalmentInfo(this.instalmentId);
    }
  }

  protected getNextPayment(instalment: InstalmentExtendedModel): InstalmentElementModel {
    return instalment.elements.find(element => element.paid === true);
  }

}
