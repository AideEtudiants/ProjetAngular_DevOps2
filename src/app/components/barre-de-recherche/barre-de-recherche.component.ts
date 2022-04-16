import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { User } from 'src/app/Entity/UserEntity';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RechercheService } from 'src/app/services/search/rechercheService.service';
import { AuthenticationService } from 'src/app/services/user/user.service';
import { ProductEntity } from '../../Entity/ProductEntity';
import { ProduitsComponent } from '../Produits/produits.component';

 @Component({
  selector: 'app-barre-de-recherche',
  templateUrl: './barre-de-recherche.component.html',
  styleUrls: ['./barre-de-recherche.component.css']
})
export class BarreDeRechercheComponent  implements OnInit {
  myControl = new FormControl();
  options: any=[];
  data:any='';
  filteredOptions: Observable<string[]>;
  public totalItem : number ;
  totalNotif : number ;
  productList : ProductEntity[];
  // currentUser: User;

  constructor(
    protected serviceRecherche : RechercheService,
    protected router: Router,
    protected cartService : CartService,
    protected productService : ProductService,
    protected toastService : ToastrService,
    protected authenticationService :AuthenticationService,
    private userService : AuthenticationService,
  ){}
  get currentUser() : any {
    return this.authenticationService.CurrentUserValue;
  }
  get isConnected() :boolean{
       console.log(this.currentUser)
    return this.currentUser == undefined ? false : true ;
  }

  ngOnInit() {
    this.totalProductInCart();
    this.serviceRecherche.getAll().subscribe((data:ProductEntity[])=>{
      this.options= data.map(p=>p.name);
      console.log(this.options);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
   );

  }
  totalProductInCart(){
    this.cartService.getProducts(4)
     .subscribe(res=>{
       this.totalItem = res?.length;
       console.log(this.totalItem)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    console.log(this.options.filter(option => option.toLowerCase().includes(filterValue)))
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  getAllProducts(){
    this.productService.getAllProducts()
    . subscribe ((data :ProductEntity [] )=>{
        this.productList = data;
        },
    (error:HttpErrorResponse)=>{
        alert(error.message)
        this.toastService.error('Erreur')
        }
    );
}
  rechercher(){
    this.serviceRecherche.rechercheProduct(this.data).subscribe();
   
  }
  disconnect(){
    this.userService.logout();

  }

}




