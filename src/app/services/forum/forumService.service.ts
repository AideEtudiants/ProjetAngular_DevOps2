import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { AnswerEntity } from 'src/app/Entity/AnswerEntity';


@Injectable({

  providedIn: 'root'

})

export class ForumAnswerService {

  constructor(private http:HttpClient) {  }

   getAllForums(): Observable <ForumEntity[]>{
    return this.http.get<ForumEntity[]>("http://localhost:8080/forum/list");
  }
  
  listAnswerByForum(idForum:number): Observable<AnswerEntity[]>{
    return this.http.get<AnswerEntity[]>(`http://localhost:8080/forum/listAnswerByForum/${idForum}`);
  }

  updateAnswer(answer:AnswerEntity):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/updateAnswer",answer);
  }

  updateForum(forum:ForumEntity):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/updateForum",forum);
  }

  addForum(newForum:ForumEntity):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/createForum",newForum);
  }

  deleteForum(idforum: number):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/deleteForum",idforum);
  }

  deleteAnswer(idanswer: number):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/deleteAnswer",idanswer);
  }

  addAnswerToForum(answer:AnswerEntity):Observable<any>{
    return this.http.post<any>("http://localhost:8080/forum/addAnswerToForum",answer);
  }

  findForumById(idforum:number):Observable<ForumEntity>{
    return this.http.get<ForumEntity>(`http://localhost:8080/forum/${idforum}`);
  }

  
}
