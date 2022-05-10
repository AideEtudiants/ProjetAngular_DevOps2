
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnswerEntity } from 'src/app/Entity/AnswerEntity';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { CartService } from 'src/app/services/cart/cart.service';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';
import { AuthenticationService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  forum:ForumEntity;
  answer:AnswerEntity=new AnswerEntity(null, this.route.snapshot.params.id,this.currentUser.id,'',null);
  idQuestion : number;
  answers : AnswerEntity[]=[];
  public totalItem : number ;


  constructor(private router: Router,private rout: Router,
    protected forumService:ForumAnswerService, 
    protected toastService : ToastrService,
    protected route : ActivatedRoute,
    public authenticationService :AuthenticationService, 
    protected cartService : CartService
    ){}
    
    get currentUser() : any {
      return this.authenticationService.CurrentUserValue;
    }

  ngOnInit(): void {
    this.idQuestion = this.route.snapshot.params.id;
    this.totalProductInCart();
     this.forumService.findForumById(this.idQuestion).subscribe({
      next :(question : ForumEntity)=>{
        console.log(question)
        this.forum = question;      
      },
      error :()=>  this.toastService.error('Erreur lors de laffichage ')

    });
    this.getAnswersById();

  }
  totalProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
      })
  }
  getAnswersById(){
    this.forumService.listAnswerByForum(this.idQuestion).subscribe({
      next :(result : AnswerEntity[])=>{
        this.answers = result;   
      },
      error :()=>  this.toastService.error('Erreur lors de laffichage ')

    });

  }

  onNoClick(){
    this.router.navigate(["/forum"]);
  }

  repondre(){
    this.forumService.addAnswerToForum(this.answer)
    .subscribe({
        next :()=>{ this.ngOnInit();}  ,
        error :()=>  this.toastService.error('Erreur lors de lajout')

    });
 
}

  }

