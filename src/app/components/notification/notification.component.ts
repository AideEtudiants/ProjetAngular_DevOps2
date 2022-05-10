import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationEntity } from 'src/app/Entity/NotificationEntity';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { HelloService } from '../../services/hello/hello-service.service';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotifiationComponent implements OnInit {
 @Input() notificationList : NotificationEntity[] ; 
 @Input() totalNotif : number;;
 
 showNotification: boolean;  

constructor() { }

  ngOnInit(): void {
  }
  openNotification(state: boolean) {
    this.showNotification = state;
  }

}
