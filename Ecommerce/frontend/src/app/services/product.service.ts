import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.serverURL;
  constructor(private http: HttpClient) { }

  // FETCH ALL PRODUCTS FROM BACKEND
  getAllProducts(numberOfResults = 10) : Observable<serverResponse>{
    return this.http.get<serverResponse>(this.SERVER_URL + '/products/', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }
  /* GET SINGLE PRODUCT FORM THE SERVER*/

  getSingleProduct(id: number): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  /* GET PRODUCTS FOR ONE CATEGORY*/
  getProductsFromCategory(catName: string) : Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
  }
}
