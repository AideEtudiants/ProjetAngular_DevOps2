import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ProductEntity } from '../../Entity/ProductEntity';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Cart } from 'src/app/Entity/cartEntity';
import { RechercheService } from 'src/app/services/rechercheService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AvailabilityEnum } from 'src/app/enum/availability.enum';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  productList : ProductEntity [];
  productFiltredList : ProductEntity [];
  filter: boolean =false;
  public totalItem : number ;
  public searchTerm !: string;
  myControl = new FormControl();
  options: any=[];
  data:any='';
  public p:ProductEntity={
    id: 0,
    name: '',
    image: '',
    description: '',
    statusCode: 0,
    categoryCode: 0,
    availability: 0,
    idUser :4,
    startDate : new Date(),
    price : 0
    };
  elementTrouve:any=[];
  filteredOptions: Observable<string[]>;
  productListSelect: boolean ;
  NewProduct :ProductEntity={
      id: 0,
      name: '',
      image: '',
      description: '',
      statusCode: 0,
      categoryCode: 0,
      availability: 0,
      idUser :4,
      startDate : new Date(),
      price : 0
  };

  constructor(
      protected productService : ProductService,
      protected toastService : ToastrService,
      protected cartService : CartService,
      protected router: Router,
      private serviceRecherche : RechercheService,
      private route: ActivatedRoute,
      public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getAllProducts();
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

   private _filter(value: string): string[] {
         const filterValue = value.toLowerCase();
         return this.options.filter(option => option.toLowerCase().includes(filterValue));
         }
    rechercher(){
    this.serviceRecherche.rechercheProduct(this.data).subscribe(
    (data:ProductEntity[])=>{
    this.elementTrouve= data;
    console.log(this.elementTrouve);
    this.gotoElementTrouve();
    this.filter= true;
    }
    );

    }
    gotoElementTrouve() {
    this.router.navigate(['/produits']);
    }
    totalProductInCart(){
      this.cartService.getProducts(4)
       .subscribe(res=>{
         this.totalItem = res?.length;
         console.log(this.totalItem)
        })
    }
    public get getTotalItem(){
        return this.totalItem;
    }
    getAllProducts(){
        this.productService.getAllProducts()
        . subscribe ((data :ProductEntity [] )=>{
            this.productList = data;
            this.filter=false;
            },
        (error:HttpErrorResponse)=>{
            alert(error.message)
            this.toastService.error('Erreur')
            }
        );
    }
    deleteProduct(idProduct : number){
        this.productService.RemoveProduct(idProduct)
        .subscribe({
            next :(data)=>{
                this.getAllProducts();
                this.toastService.success('Le produit est bien été supprimé')
            },
            error :()=>  this.toastService.error('Erreur lors de la suppression')

        });
    }
    addProduct(product : ProductEntity){
        this.productService.addProduct(product)
        .subscribe({
            next :(data)=>{
                this.toastService.success('Le produit est bien été ajouté')
            },
            error :()=>  this.toastService.error('Erreur lors de lajout')

        });
    }

    addtocart(produit : ProductEntity){
        let cart = new Cart(produit.id,4);
        console.log(cart)
        this.cartService.addtoCart(cart).subscribe(res=>{
            this.productListSelect =  res;
            this.totalProductInCart();

        });
    }

    // findProductByCategory(idCategorie:number){
    //     this.productService.findProductByCategory(idCategorie)
    //     .subscribe({
    //         next :(data:ProductEntity[])=>{
    //             this.productFiltredList=data;
    //             this.filter= true;
    //         },
    //         error :()=>  this.toastService.error('Erreur')
    //     });
    // }
    filterProductBy(idCategorie:number,idStatus : number,idAvailability : number,idDate : number){
        this.productService.filterProduct(idCategorie,idStatus,idAvailability,idDate)
        .subscribe({
            next :(data:ProductEntity[])=>{
                this.productFiltredList=data;
                this.filter= true;
            },
            error :()=>  this.toastService.error('Erreur')
        });
    }
    openCart(){
        this.router.navigate(['/cart']);
    }

    newProduct(): void {
        const dialogRef = this.dialog.open(NewProduct, {
          width: '750px',
          height:'700px',
          data: {},
        });

        dialogRef.afterClosed().subscribe(result => {

            if(result!=null){
                this.NewProduct = result;
                this.productService.addProduct(this.NewProduct).subscribe();
                this.gotoElementTrouve();
            }
          console.log(this.NewProduct);

        });
    }
    public getAvailability(availability : number) : String{
        if(availability == AvailabilityEnum.disponible ){
            return " Disponible";
        }else if (availability == AvailabilityEnum.donne){
            return " Donné" ;
        }else {
            return " Non disponible";
        }

    }
}

@Component({
    selector: 'newProduct',
    templateUrl: 'newProduct.html',
  })
  export class NewProduct {
    selectedFile: File;
    constructor(
      public dialogRef: MatDialogRef<NewProduct>,
      @Inject(MAT_DIALOG_DATA) public data: ProductEntity,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0].name
        console.log(this.selectedFile);
      }
  }
