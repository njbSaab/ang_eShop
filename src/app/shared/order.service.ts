import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {map} from "rxjs";
import {FbResponse, FirebaseObject, Product} from "./interfaces"

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http : HttpClient) { }
  create(order: any) {
    return this.http.post(`${environment.fbDbURL}/orders.json`, order)
      .pipe(map((res: any) => {
        if (!res) {
          return null;
        }
        const fbResponse: FbResponse = res;
        return {
          ...order,
          id: fbResponse.name,
          data: new Date(order.data)
        };
      }));
  }


  getAll(){
    return this.http.get<FirebaseObject>(`${environment.fbDbURL}/orders.json`)
      .pipe(map (res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id:key,
            date:new Date(res[key].date)
          }))
      }))
  }

  remove(id: number | undefined){
    return this.http.delete(`${environment.fbDbURL}/orders/${id}.json`)
  }

}

