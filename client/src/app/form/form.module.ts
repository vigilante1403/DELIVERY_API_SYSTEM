import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculateChargesFormComponent } from './calculate-charges-form/calculate-charges-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DeliveriesFormComponent } from './deliveries-form/deliveries-form.component';
import { DeliveryAgentFormComponent } from './delivery-agent-form/delivery-agent-form.component';
import { DeliveryServiceFormComponent } from './delivery-service-form/delivery-service-form.component';
import { DeliveryStatusFormComponent } from './delivery-status-form/delivery-status-form.component';
import { OrderDetailFormComponent } from './order-detail-form/order-detail-form.component';
import { OrderPaymentFormComponent } from './order-payment-form/order-payment-form.component';
import { OrderPaymentStatusFormComponent } from './order-payment-status-form/order-payment-status-form.component';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { OrdersStatusFormComponent } from './orders-status-form/orders-status-form.component';
import { ParcelsFormComponent } from './parcels-form/parcels-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CalculateChargesFormComponent,CustomerFormComponent,DeliveriesFormComponent,DeliveryAgentFormComponent,DeliveryServiceFormComponent,DeliveryStatusFormComponent,OrderDetailFormComponent,OrderPaymentFormComponent,OrderPaymentStatusFormComponent,OrdersFormComponent,OrdersStatusFormComponent,ParcelsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    
  ]
})
export class FormManageModule { }
