import { Component, OnInit } from '@angular/core';
import { ClassEntity } from 'src/app/Entity/classEntity';
import { ClassService } from 'src/app/services/class/classService.service';
import { ProductEntity } from 'src/app/Entity/ProductEntity';
import { User } from 'src/app/Entity/UserEntity';
import { UserService } from 'src/app/services/user/user-service.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthenticationService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  user: User;
  products: ProductEntity[];
  class: ClassEntity[];
  public totalItem : number ;

  constructor(private userService : UserService,
              private productService : ProductService,
              private classService : ClassService,
              protected cartService : CartService,
              protected authenticationService :AuthenticationService,
            ) {}
    get currentUser() : any {
        return this.authenticationService?.CurrentUserValue;
    }

  ngOnInit():void {
    this.totalProductInCart();
    this.userService.getUserById(this.currentUser?.id).subscribe(data=>{
      this.user=data;
    });

    this.userService.getProductAdd(this.currentUser?.id).subscribe(data=>{
        this.products=data;
    });

    this.userService.getClassByUser(this.currentUser?.id).subscribe(data=>{
      this.class=data;
    });
  }
  totalProductInCart(){
    this.cartService.getProducts(this.currentUser?.id)
    .subscribe(res=>{
      this.totalItem = res?.length;
      console.log(this.totalItem)
      })
  }

  deleteProduct(prod: ProductEntity){
    let confirmation = confirm("Etes-vous sûr de vouloir supprimer ce produit?");
    if(confirmation){
      const index = this.products.indexOf(prod, 0);
      if(index > -1){
        this.products.splice(index, 1);
        this.productService.deleteProduct(prod.id);
      }
    }
  }

  deleteClass(clas: ClassEntity){
      let confirmation = confirm("Etes-vous sûr de vouloir supprimer ce cours?");
      if(confirmation){
        const index = this.class.indexOf(clas, 0);
        if(index > -1){
          this.class.splice(index, 1);
          this.classService.deleteClass(clas.id);
        }
      }
    }

}

