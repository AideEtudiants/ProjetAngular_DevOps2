import { Component, Input, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { AuthenticationService } from 'src/app/services/user/user.service';
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
 constructor(
  protected notiService : NotificationService,
  private toastService : ToastrService,
  public authenticationService :AuthenticationService,
   
) {}
get currentUser() : any {
  return this.authenticationService?.CurrentUserValue;
}

  ngOnInit(): void {
    // this method 'ngOnInit' is empty but its necessary for the definition of component 
  }
  openNotification(state: boolean) {
    this.showNotification = state;
  }
  onDelete(idNotif : number){
    console.log(idNotif)
    this.notiService.deleteNotif(idNotif)
    .subscribe({
      next :()=>{ 
        this.notiService.getAllNotifications(this.currentUser.id).subscribe((datas )=>{
        this.notificationList = datas;
        this.totalNotif = datas.length
     });
      },
      error :()=>{ this.toastService.error('Erreur lors de la suppression')} 

  });
  }

}
