// afin d'importer toutes les donnée de la base en autocomplete dans la barre de recherche

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductEntity } from '../Entity/ProductEntity';



@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http:HttpClient) {  }

  getAll() : Observable<any>{
    return this.http.get("http://localhost:8080/product/all");
  }

  rechercheProduct(element:String) : Observable<any>{
    // if(!element.trim()){
    //   return of([]);
    // }
    // return this.http.get(`http://localhost:8080/${element}`).pipe(
    //     tap(x => x.length ?
    //        this.log(`produit trouvé "${element}"`) :
    //        this.log(`pas de produit de ce nom "${element}"`))
    //   );
    return this.http.post('http://localhost:8080/product/searchProduct',element);
  }
}
