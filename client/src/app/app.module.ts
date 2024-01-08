
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './modal/login/login.component';
import { SignupComponent } from './modal/signup/signup.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { DeliveryAgentFormComponent } from './form/delivery-agent-form/delivery-agent-form.component';
import { DeliveryStatusFormComponent } from './form/delivery-status-form/delivery-status-form.component';
import { DeliveriesFormComponent } from './form/deliveries-form/deliveries-form.component';
import { CustomerFormComponent } from './form/customer-form/customer-form.component';
import { OrdersFormComponent } from './form/orders-form/orders-form.component';
import { OrdersStatusFormComponent } from './form/orders-status-form/orders-status-form.component';
import { ParcelsFormComponent } from './form/parcels-form/parcels-form.component';
import { OrderPaymentFormComponent } from './form/order-payment-form/order-payment-form.component';
import { OrderPaymentStatusFormComponent } from './form/order-payment-status-form/order-payment-status-form.component';
import { OrderDetailFormComponent } from './form/order-detail-form/order-detail-form.component';
import { DeliveryServiceFormComponent } from './form/delivery-service-form/delivery-service-form.component';
import { CalculateChargesFormComponent } from './form/calculate-charges-form/calculate-charges-form.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { ModalService } from './modal/modal.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    ModalComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    EmployeeComponent,
    DeliveryAgentFormComponent,
    DeliveryStatusFormComponent,
    DeliveriesFormComponent,
    CustomerFormComponent,
    OrdersFormComponent,
    OrdersStatusFormComponent,
    ParcelsFormComponent,
    OrderPaymentFormComponent,
    OrderPaymentStatusFormComponent,
    OrderDetailFormComponent,
    DeliveryServiceFormComponent,
    CalculateChargesFormComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
 
})
export class AppModule { }
