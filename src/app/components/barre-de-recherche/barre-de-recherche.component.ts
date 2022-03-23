import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RechercheService } from 'src/app/services/search/rechercheService.service';
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

  constructor(
    protected serviceRecherche : RechercheService,
    protected router: Router,
    protected cartService : CartService,
    protected productService : ProductService,
    protected toastService : ToastrService,
  ){
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
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  rechercher(){
    this.serviceRecherche.rechercheProduct(this.data).subscribe();
    console.log(this.data)
  }

}




