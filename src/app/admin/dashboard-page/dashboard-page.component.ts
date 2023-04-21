import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../shared/interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  products: Product [] = []
  pSub?: Subscription
  productName: string = ''
  constructor(
    private productServ: ProductService
  ) {

  }
  ngOnInit(): void {
    this.productServ.getAll().subscribe(products  => {
      this.products = products
      })
  }
  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
  }
  remove(id :number | undefined ){
    this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
