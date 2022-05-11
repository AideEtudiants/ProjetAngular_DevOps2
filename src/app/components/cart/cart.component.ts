import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../Entity/cartEntity';
import { AuthenticationService } from '../../services/user/user.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  isEmptyCart: boolean = false;
 public totalItem : number ;
  constructor(
    private cartService : CartService,
    private router: Router,
    private toastService : ToastrService
    ,  public authenticationService :AuthenticationService,
   
    ){}
      get currentUser() : any {
        return this.authenticationService?.CurrentUserValue;
      }
    

  ngOnInit(): void {
    this.getAllProductInCart();
    this.cartService.getTotalPrice(this.currentUser.id)
    .subscribe(res=>{
       this.grandTotal =  res;
    });

  }
  getAllProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
    .subscribe(res=>{
      this.products = res;
      this.totalItem = res?.length;
      
    });
  }
  removeItem(idProduit : number ,idUser : number){
    let cart  = new Cart(idProduit,idUser)
    this.cartService.removeCartItem(cart)
    .subscribe({
      next :(data)=>{
        this.getAllProductInCart();
        this.toastService.success('Le produit est bien été supprimé du panier')
      },
      error :()=>  this.toastService.error('Erreur lors de la suppression')

  });
  }
  emptycart(){
    this.cartService.removeAllCart(this.currentUser.id)
    .subscribe({
      next :(data)=>{
        this.isEmptyCart= true;
        this.getAllProductInCart();    
        this.toastService.success('Les produits ont bien été supprimés du panier')
      },
      error :()=>  this.toastService.error('Erreur lors de la suppression')

  });
  }
  openProducts(){
    this.router.navigate(['/produits']);
  }
  getCategory(categoryCode : number) : string {
     return categoryCode == 1 ? " Livre" : "Equipement" ;
  }

}
