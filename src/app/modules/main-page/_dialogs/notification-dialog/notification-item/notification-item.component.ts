import {Component, Input, OnInit} from '@angular/core';
import {NotificationModel} from '#models/notification.model';
import {NotificationService} from '#services/notification-service/notification.service';

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

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

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
    }
  }

  markNotificationAsRead() {
    this.notification.seen = true;
    this.notificationService.markNotification(this.notification)
      .subscribe(
        (response) => {
          // this.notification.seen = response.notification.seen;
        },
        (error) => {
          this.errorInfo = error;
        });
  }
}
