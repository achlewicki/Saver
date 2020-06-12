import { Component, OnInit } from '@angular/core';
import {CyclicService} from '#services/cyclic/cyclic.service';
import {MainPageService} from '#services/main-page-service/main-page.service';
import {CyclicModel} from '#models/cyclic.model';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { InstalmentsService } from '#services/instalments-service/instalments.service';
import {InstalmentBasicModel, InstalmentElementModel, InstalmentExtendedModel} from '#models/instalment.model';

@Component({
  selector: 'svr-dashboard-cyclic',
  templateUrl: './dashboard-cyclic.component.html',
  styleUrls: ['./dashboard-cyclic.component.scss']
})
export class DashboardCyclicComponent implements OnInit {
  protected cyclic: CyclicModel;
  protected selectedInstalment: InstalmentBasicModel;
  protected closestDate: Date;
  protected element: InstalmentElementModel;
  protected nextCyclicIcon = faHourglassHalf;

  constructor(
    private readonly cyclicService: CyclicService,
    private readonly mainPageService: MainPageService,
    private readonly instalmentsService: InstalmentsService
  ) { }

  ngOnInit() {
    this.mainPageService.activeAccount.subscribe(account => {
      this.cyclicService.getAllCyclics(account.id).subscribe(returnedCyclics => {
        returnedCyclics.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
        this.cyclic = returnedCyclics[0];
      });

      this.instalmentsService.getInstalmentsByAccount(account.id).subscribe(returnedInstalments => {
        this.selectedInstalment = returnedInstalments[0];
        returnedInstalments.forEach( singleInstalment => this.instalmentsService.getInstalmentInfo(singleInstalment.id)
          .subscribe( extendetInfo => {
            if (this.closestDate === undefined) { this.closestDate = extendetInfo.elements[extendetInfo.elements.length - 1].date; }
            this.element = extendetInfo.elements.find(singleElement => singleElement.paid === false);
            console.log(this.element.date +  ' | ' + this.closestDate);
            if (this.element.date < this.closestDate) {
              this.selectedInstalment = singleInstalment;
              this.closestDate = this.element.date;
            }
        }));
      });

    });


  }

}
