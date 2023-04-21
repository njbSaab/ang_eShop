import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Observable} from "rxjs";
import {Product} from "../shared/interfaces";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  products$!: Observable<Product[]>;
  constructor(
    public productServe: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.productServe.getAll()
  }
}
