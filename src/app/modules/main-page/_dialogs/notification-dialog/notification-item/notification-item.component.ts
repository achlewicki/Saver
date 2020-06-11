import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '#models/notification.model';
import { NotificationService } from '#services/notification-service/notification.service';
import { NotificationDialogComponent } from '#dialogs/notification-dialog/notification-dialog.component';
import { AccountModel } from '#models/account.model';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { OperationModel } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';

@Component({
  selector: 'svr-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input()
  notification: NotificationModel;
  protected errorInfo = '';
  protected iconName = '';
  protected iconColor = '';
  protected expanded = false;
  protected account: AccountModel;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationDialogComponent: NotificationDialogComponent,
    private readonly mainPageService: MainPageService,
    private readonly operationService: OperationsService,
  ) { }

  ngOnInit() {
    switch (this.notification.type) {
      case 'achievement_get':
        this.iconName = 'award';
        this.iconColor = '#0074D9';
        break;
      case 'category_limit':
        this.iconName = 'exclamation';
        this.iconColor = '#FF4136';
        break;
      case 'level_up':
        this.iconName = 'level-up-alt';
        this.iconColor = '#2ECC40';
        break;
      case 'money_save':
        this.iconName = 'coins';
        this.iconColor = 'red';
        break;
      case 'event_reminder':
        this.iconName = 'calendar-alt';
        this.iconColor = 'darkorange';
        break;
    }
    this.mainPageService.activeAccount.subscribe(
      result => this.account = result
    );
  }

  markNotificationAsRead() {
    this.expanded = !this.expanded;
    this.notification.seen = true;
    this.notificationDialogComponent.notificationCounter();
    this.notificationService.markNotification(this.notification)
      .subscribe(
        (response) => {
        },
        (error) => {
          this.errorInfo = error;
        });
  }

  addTransaction() {
    this.expanded = !this.expanded;
    const value = parseInt(this.notification.event.value.valueOf().toString(), 10);
    const operation: OperationModel = {
      title: this.notification.event.title.valueOf(),
      description: this.notification.event.description.valueOf(),
      type: value < 0 ? -1 : 1,
      value: value * (value < 0 ? -1 : 1),
      date: new Date(),
      intoAccount: 1,
      subcategory: null,
      distinction: 'regular',
      event: this.notification.event.id.valueOf()
    };
    this.operationService.saveEventOperation(this.account.id, operation).subscribe(
      res => {
        // TODO - Completed Dialog
        console.log(res);
        alert('Pomyślnie dodano operacje: ' + operation.title);
        this.mainPageService.operationAdded.next(res);
      },
      err => {
        // TODO - Error Dialog
        console.error(err);
        alert('Wystąpił błąd podczas dodawania oepracji: ' + err.error);
      }
    );
  }

  rescheduleEvent() {
    this.expanded = !this.expanded;
  }

  denyEvent() {
    this.expanded = !this.expanded;
  }
}

