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



@NgModule({
  declarations: [EmployeeComponent, UserDeliveryFetchComponent, DeliveringFetchComponent, DeliveredFetchComponent, TransitFetchComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoute),
    FormsModule,ReactiveFormsModule,
   
  ],
  exports:[
    EmployeeComponent
  ],providers:[DatePipe]
})
export class EmployeeModule { }
