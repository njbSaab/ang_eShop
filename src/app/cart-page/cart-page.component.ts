import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../shared/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cartProducts: Product[] = []
  totalPrice = 0
  form: FormGroup | any
  submitted = false

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService
  ) {

  }
  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts;
    for(let i = 0; i < this.cartProducts.length; i++) {
      const price = this.cartProducts[i].price
      if(price !== undefined){
        this.totalPrice += +price
      }
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit(){
    if(this.form.invalid){
      return;
    }
    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date()
    }
    this.orderServ.create(order).subscribe( res =>{
      this.form.reset()
      this.submitted = false
    })

  }
  delete(product:any){
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product))
  }
}
