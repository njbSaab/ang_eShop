import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
  form: FormControl | any
  product: Product | undefined

  submit = false

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private router : Router

  ) {
  }
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productServ.getById(params['id'])
      })
    ).subscribe(product  => {
        this.product = product
        this.form = new FormGroup({
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          photo: new FormControl(this.product.photo, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required)
        })
    })
  }
  submitted(){
    if(this.form.invalid){
      return
    }
    this.submit = true

    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: this.form.value.date,
    }).subscribe( res => {
      this.form.reset()
      this.submit = false
      this.router.navigate(['/'])
    })
  }
}
