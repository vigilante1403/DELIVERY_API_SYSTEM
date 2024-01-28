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
import { NewCheckoutComponent } from './new-checkout/new-checkout.component';
import { DonePaymentComponent } from './new-checkout/done-payment/done-payment.component';
import { WaitingPaymentComponent } from './new-checkout/waiting-payment/waiting-payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './new-checkout/waiting-payment/paypal/paypal.component';
import { PreCheckoutComponent } from './form/pre-checkout/pre-checkout.component';
import { UpdateUnpaidFormsComponent } from './update-unpaid-forms/update-unpaid-forms.component';
import { TestLineComponent } from './test-line/test-line.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from 'ngx-spinner';

import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    NewCheckoutComponent,
    DonePaymentComponent,
    WaitingPaymentComponent,
    PaypalComponent,
    PreCheckoutComponent,
    UpdateUnpaidFormsComponent,
    TestLineComponent,
   

    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoute),
    ReactiveFormsModule,FormsModule,
    FontAwesomeModule,
    AlertModule.forRoot(),
    NgxPayPalModule,
    CollapseModule.forRoot(),
    NgxSpinnerModule,
    MatSnackBarModule
    
  ],
  exports:[
    UserComponent
  ]
})
export class UserModule { }
