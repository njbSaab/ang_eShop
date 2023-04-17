import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdnimLayuotComponent } from './shared/adnim-layuot/adnim-layuot.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../shared/auth.guard";


@NgModule({
  declarations: [
    AdnimLayuotComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AddPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component:AdnimLayuotComponent, children:[
          {path: '', redirectTo: '/admin/login', pathMatch: "full"},
          {path:'login', component: LoginPageComponent},
          {path:'dashboard', component: DashboardPageComponent, canActivate:[AuthGuard]},
          {path:'add', component: AddPageComponent, canActivate:[AuthGuard]},
          {path:'orders', component: OrdersPageComponent, canActivate:[AuthGuard]},
          {path:'product/:id/edit', component: EditPageComponent, canActivate:[AuthGuard]},
        ]
      }
    ])
  ],
  exports: [],
})

export class AdminModule{

}
