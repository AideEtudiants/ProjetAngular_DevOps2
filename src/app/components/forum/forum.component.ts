import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumEntity } from 'src/app/Entity/ForumEntity';
import { ForumAnswerService } from 'src/app/services/forum/forumService.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthenticationService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
 ForumList  : ForumEntity [];
 public totalItem : number ;
 options: any=[];
  data:any='';

  constructor(private router: Router,protected forumservice: ForumAnswerService, protected toastService : ToastrService,protected cartService : CartService,  public authenticationService :AuthenticationService,
   
  ){}
    get currentUser() : any {
      return this.authenticationService?.CurrentUserValue;
    }
  
  ngOnInit(): void {
    this.totalProductInCart();
    this.getAllForums();
  }
  totalProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
      })
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
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
          this.toastService.error('Erreur')
          }
    );
   }
}
