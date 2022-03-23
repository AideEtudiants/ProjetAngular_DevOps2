import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductEntity } from 'src/app/Entity/ProductEntity';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  products: ProductEntity[];
  currentProduct = new ProductEntity();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
    this.currentProduct = this.consulterProduct(this.activatedRoute.snapshot.params.id);
    console.log(this.currentProduct);
  }

  consulterProduct(idp: number) : ProductEntity {
    return this.products.find(p => p.id == idp);
  }
  updateProduct() {
    //this.productService.updateProduct(this.currentProduct);
    this.router.navigate(['profil']);
  }
}
