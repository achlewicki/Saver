import { Component, OnInit } from '@angular/core';
import {CyclicService} from '#services/cyclic/cyclic.service';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {CyclicModel} from '#models/cyclic.model';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { InstalmentsService } from '#services/instalments-service/instalments.service';
import {InstalmentBasicModel, InstalmentElementModel} from '#models/instalment.model';

@Component({
  selector: 'svr-dashboard-cyclic',
  templateUrl: './dashboard-cyclic.component.html',
  styleUrls: ['./dashboard-cyclic.component.scss']
})
export class DashboardCyclicComponent implements OnInit {
  protected cyclic: CyclicModel = null;
  protected selectedInstalment: InstalmentBasicModel;
  protected closestDate: Date;
  protected element: InstalmentElementModel = {
    date: null,
    value: null,
    paid: null
  };
  protected nextCyclicIcon = faHourglassHalf;
  protected value = 0;
  protected pendingValue = false;

  constructor(
    private readonly cyclicService: CyclicService,
    private readonly mainPageService: MainPageService,
    private readonly instalmentsService: InstalmentsService
  ) { }

  ngOnInit() {
    this.pendingValue = true;
    this.mainPageService.activeAccount.subscribe(account => {
      this.cyclicService.getAllCyclics(account.id).subscribe(returnedCyclics => {
        returnedCyclics.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
        this.cyclic = returnedCyclics[0];
      });

      this.instalmentsService.getInstalmentsByAccount(account.id).subscribe(returnedInstalments => {
        this.selectedInstalment = returnedInstalments[0];
        returnedInstalments.forEach( (singleInstalment, index) => this.instalmentsService.getInstalmentInfo(singleInstalment.id)
          .subscribe( extendedInfo => {
            if (this.closestDate === undefined) { this.closestDate = extendedInfo.elements[extendedInfo.elements.length - 1].date; }
            if (index === 0) { this.element = extendedInfo.elements[extendedInfo.elements.length - 1]; }
            this.element = extendedInfo.elements.find(singleElement => singleElement.paid === false);
            if (this.element.date < this.closestDate) {
              this.selectedInstalment = singleInstalment;
              this.closestDate = this.element.date;
              this.value = this.element.value;
            }
            if (index === returnedInstalments.length - 1)  { this.pendingValue = false; }
          }));
      });

    });


  }

}
