import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/Entity/cartEntity';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }
  getProducts(idUser: number): Observable<any>{
    return this.http.post<any>("http://localhost:8080/cart/list",idUser);
  }
  addtoCart(cart : Cart) :Observable<any>
  {
    return this.http.post<any>("http://localhost:8080/cart/create",cart)
  }
  getTotalPrice(idUser: number) :Observable<number>{
    return this.http.post<number>("http://localhost:8080/cart/totalPrice",idUser);
  }
  removeCartItem(cart : Cart){
    return this.http.post(`http://localhost:8080/cart/delete`,cart);
  }
  removeAllCart(idUser: number):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/cart/deleteAll`,idUser);
  }
}