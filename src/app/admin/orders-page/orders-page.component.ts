import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";
import {Order} from "../../shared/interfaces";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{

  orders : Order[] = []
  pSub?: Subscription
  rSub!: Subscription

  constructor(
    private orderSev: OrderService,

  ) {
  }
  ngOnInit(): void {
    this.pSub = this.orderSev.getAll().subscribe( orders =>{
      this.orders = orders
    })
  }
  ngOnDesroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.rSub){
      this.rSub.unsubscribe()
    }
  }
  remove(id:any){
    this.rSub = this.orderSev.remove(id).subscribe(()=>{
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }
}

