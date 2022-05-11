import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Entity/UserEntity';
import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user/user-service.service';
import { AuthenticationService } from '../../services/user/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit  {

  user: User;
  public totalItem : number ;

  constructor(
    private route: ActivatedRoute,
      private router: Router,
        private userService: UserService,
        protected authenticationService :AuthenticationService,
        protected cartService : CartService) {
    this.user = new User();
  }

  get currentUser() : any {
    return this.authenticationService?.CurrentUserValue;
  }
  ngOnInit(): void {
   this. totalProductInCart();
  }

  totalProductInCart(){
    this.cartService.getProducts(this. currentUser?.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
      })
  }
  onSubmit() {
    this.userService.save(this.user)
      .subscribe((data : any)=>{
        this.router.navigate(['/produit']);
      },
      (err : HttpErrorResponse)=>{
      });

  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
