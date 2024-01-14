import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { UserRoute } from './user.routing';
import { CartComponent } from './cart/cart.component';
import { AddPackageFormComponent } from './form/add-package-form/add-package-form.component';
import { SharedModule } from '../shared/shared.module';
import { AddressFormComponent } from './form/address-form/address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersFormComponent } from './form/orders-form/orders-form.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    UserComponent,
    OrdersFormComponent,
    CartComponent,
    AddPackageFormComponent,
    CheckoutComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoute),
    ReactiveFormsModule,FormsModule
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
