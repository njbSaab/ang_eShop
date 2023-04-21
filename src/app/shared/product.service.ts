import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {map} from "rxjs";
import {FbResponse, FirebaseObject, Product} from "./interfaces";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartProducts: Product [] = [];
  type : string = 'All';
  constructor(private http: HttpClient) { }

  create(product: any) {
    return this.http.post(`${environment.fbDbURL}/products.json`, product)
      .pipe(map((res: any) => {
        if (!res) {
          return null;
        }
        const fbResponse: FbResponse = res;
        return {
          ...product,
          id: fbResponse.name,
          data: new Date(product.data)
        };
      }));
  }
  getAll(){
    return this.http.get<FirebaseObject>(`${environment.fbDbURL}/products.json`)
      .pipe(map (res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id:key,
            date:new Date(res[key].date)
          }))
      }))
  }
  getById(id: number){
    return this.http.get<FirebaseObject>(`${environment.fbDbURL}/products/${id}.json`)
      .pipe(map ((res: Product) => {
        return {
            ...res,
            id,
            date:new Date(res.date)
          }
      }))
  }
  remove(id: number | undefined){
    return this.http.delete(`${environment.fbDbURL}/products/${id}.json`)
  }
  update(product: Product){
    return this.http.patch(`${environment.fbDbURL}/products/${product.id}.json`, product)
  }
  setType(type : string){
    this.type = type
  }
  addProduct(product: Product){
    this.cartProducts.push(product)
  }
}
