// afin d'importer toutes les donnée de la base en autocomplete dans la barre de recherche

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http:HttpClient) {  }

  getAll() : Observable<any>{
    return this.http.get("http://localhost:8080/product/all");
  }

  rechercheProduct(element:string) : Observable<any>{
    return this.http.post('http://localhost:8080/',element);
  }
}
