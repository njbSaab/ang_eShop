import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {ProductService} from "../shared/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../shared/interfaces";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  products$!: Observable<Product | any>;

  constructor(
    private productServe: ProductService,
    private router: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.products$ = this.router.params
      .pipe(switchMap(params =>{
        return this.productServe.getById(params['id'])
      }))
  }
  addProduct(product: Product){
    this.productServe.addProduct(product)
  }

}
