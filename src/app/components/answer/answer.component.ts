import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AnswerEntity } from 'src/app/Entity/AnswerEntity';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  forum:ForumEntity;
  answer:AnswerEntity=new AnswerEntity(null,1,4,'',null);
  idQuestion : number;
  answers : AnswerEntity[]=[];


  constructor(private router: Router,private rout: Router,
    protected forumService:ForumAnswerService, 
    protected toastService : ToastrService,
    protected route : ActivatedRoute) { }

  ngOnInit(): void {
    this.idQuestion = this.route.snapshot.params.id;
    console.log(this.idQuestion)
     this.forumService.findForumById(this.idQuestion).subscribe({
      next :(question : ForumEntity)=>{
        this.forum = question;      
      },
      error :()=>  this.toastService.error('Erreur lors de laffichage ')

    });
    this.getAnswersById();
  }
  getAnswersById(){
    this.forumService.listAnswerByForum(this.idQuestion).subscribe({
      next :(result : AnswerEntity[])=>{
        this.answers = result;   
        console.log( this.answers )
      },
      error :()=>  this.toastService.error('Erreur lors de laffichage ')

    });

  }

  onNoClick(){
    this.router.navigate(["/forum"]);
  }

  repondre(){
    console.log(this.answer);
    this.forumService.addAnswerToForum(this.answer)
    .subscribe({
        next :(data)=>{
          console.log(data);

        },
        error :()=>  this.toastService.error('Erreur lors de lajout')

    });
    this.rout.navigate(["/forum"]);
}

  }

