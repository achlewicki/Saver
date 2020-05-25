import {Component, Input, OnChanges} from '@angular/core';
import {AccountModel} from '#models/account.model';
import {EventModel} from '#models/event.model';
import {EventService} from '#services/event-service/event.service';
import {faAlignLeft, faBell, faMoneyBill} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-dashboard-event',
  templateUrl: './dashboard-event.component.html',
  styleUrls: ['./dashboard-event.component.scss']
})
export class DashboardEventComponent implements OnChanges {
  @Input() protected account: AccountModel;

  protected event: EventModel;

  protected descriptionIcon = faAlignLeft;
  protected notificationIcon = faBell;
  protected valueIcon = faMoneyBill;

  constructor(
    private readonly eventService: EventService
  ) { }

  ngOnChanges() {
    // this.eventService.getUpcomingEvent(this.account.id).subscribe(returnedEvent => {
    //   this.event = returnedEvent;
    //   if (this.event.description.length > 64) {
    //     this.event.description = this.event.description.substr(0, 64) +  '...';
    //   }
    // });
  }

}
