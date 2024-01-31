import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoute } from './employee.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDeliveryFetchComponent } from './user-delivery-fetch/user-delivery-fetch.component';
import { DeliveringFetchComponent } from './user-delivery-fetch/delivering-fetch/delivering-fetch.component';
import { DeliveredFetchComponent } from './user-delivery-fetch/delivered-fetch/delivered-fetch.component';
import { TransitFetchComponent } from './user-delivery-fetch/transit-fetch/transit-fetch.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NativeDateModule } from '@angular/material/core';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DeliveringComponent } from './delivering/delivering.component';
import { EditLocationComponent } from './delivering/edit-location/edit-location.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxPayPalModule } from 'ngx-paypal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [EmployeeComponent, UserDeliveryFetchComponent, DeliveringFetchComponent, DeliveredFetchComponent, TransitFetchComponent, UserEditComponent, EditProfileComponent, DeliveringComponent, EditLocationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoute),
    FormsModule,ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    AlertModule.forRoot(),
    NgxPayPalModule,
    CollapseModule.forRoot(),
  
    MatSnackBarModule
  ],
  exports:[
    EmployeeComponent
  ],providers:[DatePipe]
})
export class EmployeeModule { }
