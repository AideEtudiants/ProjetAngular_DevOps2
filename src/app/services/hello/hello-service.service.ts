
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntity } from 'src/app/Entity/ProductEntity';


@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(private http:HttpClient) {  }
  getMessage() : Observable<any>{
    return this.http.get("http://localhost:8080/hello",{responseType: 'text'});
  }
  getProducts() : Observable<ProductEntity[]>{
    return this.http.get<ProductEntity[]>("http://localhost:8080/products");
  }
}
