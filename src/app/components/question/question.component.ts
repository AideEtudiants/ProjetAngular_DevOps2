import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { CartService } from 'src/app/services/cart/cart.service';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';
import { AuthenticationService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  options: any=[];
  data:any='';
  ForumList  : ForumEntity [];
  forum:ForumEntity=new ForumEntity(null,'','',this.currentUser?.id,null);
  public totalItem : number ;

  constructor(private router: Router,private rout: Router,
     protected forumService:ForumAnswerService, protected toastService : ToastrService,  protected cartService : CartService,
     protected authenticationService :AuthenticationService,
   ) {}
   get currentUser() : any {
       return this.authenticationService?.CurrentUserValue;
   }

  ngOnInit(): void {
   this. totalProductInCart();
  }

  onNoClick(){
    this.router.navigate(["/forum"]);
  }
  totalProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
      })
  }

  addForum(){
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
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
          this.toastService.error('Erreur')
          }
    );
   }

}
