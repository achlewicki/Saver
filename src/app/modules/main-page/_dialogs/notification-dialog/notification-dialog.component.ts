import {Component, Input, OnInit, Output} from '@angular/core';
import {faBell, faCog, faUser} from '@fortawesome/free-solid-svg-icons';
import {MatDialogRef} from '@angular/material';
import {NotificationModel} from '#models/notification.model';
import {NotificationService} from '#services/notification-service/notification.service';

@Component({
  selector: 'svr-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  @Output()
  protected userIcon = faUser;
  protected errorInfo = '';
  protected counter = 0;
  notifications: NotificationModel[];
  notification: NotificationModel;
  bellIcon = faBell;

  constructor(
    private readonly dialogRef: MatDialogRef<NotificationDialogComponent>,
    private readonly notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService.listNotifications(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.notifications = response;
          this.notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.notificationCounter();
        },
        (error) => {
          this.errorInfo = error;
        });
  }

  public notificationCounter() {
    this.counter = 0;
    this.notifications.forEach( (object, index) => {
      if (object.seen === false) {
        this.counter++;
      }
    });
  }

  protected closeDialog() {
    this.dialogRef.close();
  }
}
