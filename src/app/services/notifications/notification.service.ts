import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationEntity } from 'src/app/Entity/NotificationEntity';
import { ProductEntity } from 'src/app/Entity/ProductEntity';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) {  }
  getAllNotifications(idUser : number) : Observable<NotificationEntity[]>{
    return this.http.get<NotificationEntity[]>(`http://localhost:8080/noti/all/${idUser}`);
  }
  deleteNotif(idNotif : number) : Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/noti/delete/${idNotif}`);
  }

}
