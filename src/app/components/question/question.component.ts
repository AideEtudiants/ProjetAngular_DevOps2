import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  options: any=[];
  data:any='';
  ForumList  : ForumEntity [];
  forum:ForumEntity=new ForumEntity(null,'','',4,null);

  constructor(private router: Router,private rout: Router,
     protected forumService:ForumAnswerService, protected toastService : ToastrService) { }

  ngOnInit(): void {

  }

  onNoClick(){
    this.router.navigate(["/forum"]);
  }

  addForum(){
    console.log(this.forum);
    this.forumService.addForum(this.forum)
    .subscribe({
        next :(data)=>{
          this.getAllForums();
          this.rout.navigate(["/forum"]);
      
        },
        error :()=>  this.toastService.error('Erreur lors de lajout')

    });
  
  }
  getAllForums(){
    this.forumService.getAllForums()
      .subscribe((data:ForumEntity [] )=>{
        this.ForumList = data
        console.log(this.ForumList)
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
          this.toastService.error('Erreur')
          }
    );
   }

}
