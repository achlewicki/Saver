import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventModel } from '#models/event.model';
import { faAlignLeft, faBell, faMoneyBill, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

  @Input()
  protected event: EventModel;

  @Output()
  protected editTriggered = new EventEmitter<void>();

  @Output()
  protected deleteTriggered = new EventEmitter<void>();

  protected descriptionIcon = faAlignLeft;
  protected notificationIcon = faBell;
  protected valueIcon = faMoneyBill;
  protected deleteIcon = faTrashAlt;
  protected editIcon = faPen;

}
