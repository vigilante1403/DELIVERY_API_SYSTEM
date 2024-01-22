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
import { NewPackageFormComponent } from './form/new-package-form/new-package-form.component';
import { NewAddressComponent } from './form/new-address/new-address.component';
import { NewCartComponent } from './new-cart/new-cart.component';
import { DeliveringTableComponent } from './new-cart/delivering-table/delivering-table.component';
import { DeliveredTableComponent } from './new-cart/delivered-table/delivered-table.component';
import { ProcessingTableComponent } from './new-cart/processing-table/processing-table.component';
import { TempTableComponent } from './new-cart/temp-table/temp-table.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifySendToComponent } from './forgot-password/verify-send-to/verify-send-to.component';
import { NewPasswordComponent } from './forgot-password/new-password/new-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AlertModule } from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [
    UserComponent,
    OrdersFormComponent,
    CartComponent,
    AddPackageFormComponent,
    NewPackageFormComponent,
    NewAddressComponent,
    NewCartComponent,
    DeliveringTableComponent,
    DeliveredTableComponent,
    ProcessingTableComponent,
    TempTableComponent,
    ForgotPasswordComponent,
    VerifySendToComponent,
    NewPasswordComponent,
    ChangePasswordComponent,

    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoute),
    ReactiveFormsModule,FormsModule,
    FontAwesomeModule,
    AlertModule.forRoot()
    
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
