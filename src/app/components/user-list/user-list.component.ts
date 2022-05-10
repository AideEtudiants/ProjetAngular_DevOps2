import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entity/UserEntity';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user-service.service';
import { AuthenticationService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  public totalItem : number ;

  constructor(private userService: UserService,protected cartService : CartService,
    protected authenticationService :AuthenticationService,
  ) {}
  get currentUser() : any {
      return this.authenticationService?.CurrentUserValue;
  }
  ngOnInit() {  //Pour stocker tous les donnee de BE(bdd) a une list
    this. totalProductInCart();
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }

 totalProductInCart(){
    this.cartService.getProducts(this.currentUser?.id)
    .subscribe(res=>{
      this.totalItem = res?.length;
      })
  }
}
