import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "./interfaces";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName =''): any {
     if(!productName.trim()){
       return products
    }
    return products.filter(products => {
      return products.title?.toLowerCase().includes(productName.toLowerCase())
    })
  }

}
