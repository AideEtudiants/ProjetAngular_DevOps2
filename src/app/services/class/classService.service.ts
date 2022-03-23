import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassEntity } from 'src/app/Entity/classEntity';
import { ClassUser } from 'src/app/Entity/ClassUser';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpClient) {  }
  
  getAllClass() : Observable< ClassEntity[]>{
    return this.http.get<ClassEntity[]>("http://localhost:8080/class/list");
  }
  getClassById(idClass: number):Observable<ClassEntity>{
    return this.http.post<ClassEntity>("http://localhost:8080/class/classById",idClass);
  }
  addClass(newClass:ClassEntity):Observable<any>{
    return this.http.post<any>("http://localhost:8080/class/create",newClass);
  }
  deleteClass(id: number):Observable<any>{
    return this.http.post<any>("http://localhost:8080/class/delete",id);
  }
  updateClass(classe:ClassEntity):Observable<any>{
    //this.deleteProduct(classe);
    //this.addProduct(classe);
    return this.http.post<any>("http://localhost:8080/class/update",classe);
  }
  listClassByUser(idUser: number):Observable<any>{
    return this.http.post<any>("http://localhost:8080/class/listClassByUser",idUser);
  }
  addUserToClass( Class: ClassUser):Observable<any>{
    return this.http.post<any>("http://localhost:8080/class/addUserToClass", Class);
  }
  nbrParticipants (idClass :number) :Observable<number>{
    return this.http.post<number>("http://localhost:8080/class/participant",idClass);
  }

}
