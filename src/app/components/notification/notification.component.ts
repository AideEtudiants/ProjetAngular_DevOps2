import { Component, Input, OnInit} from '@angular/core';
import { NotificationEntity } from '../../Entity/NotificationEntity';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotifiationComponent implements OnInit {
 @Input() notificationList : NotificationEntity[] ; 
 @Input() totalNotif : number;
 
 showNotification: boolean;  

  ngOnInit(): void {
    // this method 'ngOnInit' is empty but its necessary for the definition of component 
  }
  openNotification(state: boolean) {
    this.showNotification = state;
  }

}
