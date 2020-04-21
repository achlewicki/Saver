import {Component, Input, OnInit, Output} from '@angular/core';
import {faCog, faUser} from '@fortawesome/free-solid-svg-icons';
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
  notifications: NotificationModel[];
  notification: NotificationModel;

  constructor(
    private readonly dialogRef: MatDialogRef<NotificationDialogComponent>,
    private readonly notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService.listNotifications(parseInt(localStorage.getItem('user.id'), 10))
      .subscribe(
        (response) => {
          this.notifications = response;
        },
        (error) => {
          this.errorInfo = error;
        });
  }

  protected closeDialog() {
    this.dialogRef.close();
  }
}
