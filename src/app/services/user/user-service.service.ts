import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from 'src/app/Entity/UserEntity';
import { ClassEntity } from 'src/app/Entity/classEntity';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User){
    return this.http.post<User>(this.usersUrl, user);
  }

  getUserById(idUser: number):Observable<any>{
    return this.http.post<any>("http://localhost:8080/profile",idUser);
  }
  getNamebyId(idUser: number):Observable<any>{
  return this.http.post<any>("http://localhost:8080/users/name",idUser);
  }

  getProductAdd(idUser:number):Observable<any>{
  return this.http.post<any>("http://localhost:8080/product/listProductByUser",idUser);
  }

  getClassByUser(idUser:number):Observable<ClassEntity[]>{
  return this.http.get<any>(`http://localhost:8080/class/listClassByUser/${idUser}`);
  }
  getClassByUserCreator(idUser:number):Observable<ClassEntity[]>{
    return this.http.get<ClassEntity[]>(`http://localhost:8080/class/listClassByUserCreator/${idUser}`);
  }
}
