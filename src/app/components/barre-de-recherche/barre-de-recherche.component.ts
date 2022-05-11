import { HttpErrorResponse } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NotificationEntity } from '../../Entity/NotificationEntity';
import { CartService } from '../../services/cart/cart.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { ProductService } from '../../services/product/product.service';
import { RechercheService } from '../../services/search/rechercheService.service';
import { AuthenticationService } from '../../services/user/user.service';
import { ProductEntity } from '../../Entity/ProductEntity';

 @Component({
  selector: 'app-barre-de-recherche',
  templateUrl: './barre-de-recherche.component.html',
  styleUrls: ['./barre-de-recherche.component.css']
})
export class BarreDeRechercheComponent  implements OnInit {
  @Input() totalItem?: number;
  myControl = new FormControl();
  options: any=[];
  data:any='';
  filteredOptions: Observable<string[]>;
  totalNotif : number ;
  productList : ProductEntity[];
  notificationList: NotificationEntity[];
  // currentUser: User;

  constructor(
    protected serviceRecherche : RechercheService,
    protected router: Router,
    protected cartService : CartService,
    protected productService : ProductService,
    protected toastService : ToastrService,
    protected authenticationService :AuthenticationService,
    protected notificationService : NotificationService
   
  ){}
  get currentUser() : any {
    return this.authenticationService?.CurrentUserValue;
  }
  get isConnected() :boolean{
    return localStorage.getItem('user') == null ? false : true ;
  }

  ngOnInit() {
    this.notificationService.getAllNotifications(this.currentUser.id).subscribe((data  )=>{
      this.notificationList = data;
      this.totalNotif = data.length
   });
    this.totalProductInCart();
    this.serviceRecherche.getAll().subscribe((data:ProductEntity[])=>{
      this.options= data.map(p=>p.name);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
   );

  }
  openCart(){
    this.router.navigate(['/cart'])
  }
  totalProductInCart(){
    this.cartService.getProducts(this.currentUser.id)
     .subscribe(res=>{
       this.totalItem = res?.length;
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
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
    this. authenticationService.logout();
  }

}




