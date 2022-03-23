import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
 ForumList  : ForumEntity [];
 options: any=[];
  data:any='';

  constructor(private router: Router,protected forumservice: ForumAnswerService, protected toastService : ToastrService,) { }

  ngOnInit(): void {
    this.getAllForums();
  }

  onQuiz(){
    this.router.navigate(['/question']);
  }
  getUrl(id : number){
    this.router.navigate([`/answer/${id}`]);
  }
  getAllForums(){
    this.forumservice.getAllForums()
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
