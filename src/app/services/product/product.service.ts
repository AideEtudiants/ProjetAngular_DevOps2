import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntity } from 'src/app/Entity/ProductEntity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {  }
  getAllProducts() : Observable<ProductEntity[]>{
    return this.http.get<ProductEntity[]>("http://localhost:8080/product/all");
  }
  getProductById(idProduct: number):Observable<ProductEntity>{
      return this.http.get<ProductEntity>(`http://localhost:8080/product/${idProduct}`);
  }
  RemoveProduct(idProduct:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/product/delete/${idProduct}`);
  }
  addProduct(newProduct:ProductEntity):Observable<ProductEntity>{
    return this.http.post<ProductEntity>("http://localhost:8080/product/create",newProduct);
  }
  deleteProduct(id: number):Observable<any>{
      return this.http.post<any>("http://localhost:8080/product/deleteProduct",id);
  }
  updateProduct(productToUpdate:number):Observable<ProductEntity>{
      //this.deleteProduct(productToUpdate);
      //this.addProduct(productToUpdate);
      return this.http.post<ProductEntity>("http://localhost:8080/product",productToUpdate);
  }
  findProductByCategory(idCategorie:number) : Observable<ProductEntity[]>{
    return this.http.post<ProductEntity[]>("http://localhost:8080/product/searchByCategory",idCategorie);
  }
  filterProduct(idCategorie:number,idStatus : number,idAvailability : number,idDate : number):Observable<ProductEntity[]>{
    return this.http.get<ProductEntity[]>(`http://localhost:8080/product/search/${idCategorie}/${idStatus}/${idAvailability}/${idDate}`);
  }


}
