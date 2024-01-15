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
import { OrdersFormComponent } from '../user/form/orders-form/orders-form.component';
import { OrdersStatusFormComponent } from './orders-status-form/orders-status-form.component';
import { ParcelsFormComponent } from './parcels-form/parcels-form.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'calculatecharges', component: CalculateChargesFormComponent},
  {path: 'customer', component: CustomerFormComponent},
  {path: 'deliveries', component: DeliveriesFormComponent},
  {path: 'deliveryAgent', component: DeliveryAgentFormComponent},
  {path: 'deliveryService', component: DeliveryServiceFormComponent},
  {path: 'deliveryStatus', component: DeliveryStatusFormComponent},
  {path: 'orderDetail', component: OrderDetailFormComponent},
  {path: 'orderPayMent', component: OrderPaymentFormComponent},
  {path: 'orderPaymentStatus', component: OrderPaymentStatusFormComponent},
  {path: 'orders', component: OrdersFormComponent},
  {path: 'ordersStatus', component: OrdersStatusFormComponent},
  {path: 'parcel', component: ParcelsFormComponent},
  
]

@NgModule({
  declarations: [CalculateChargesFormComponent,CustomerFormComponent,DeliveriesFormComponent,DeliveryAgentFormComponent,DeliveryServiceFormComponent,DeliveryStatusFormComponent,OrderDetailFormComponent,OrderPaymentFormComponent,OrderPaymentStatusFormComponent,OrdersStatusFormComponent,ParcelsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
    
  ]
})
export class FormManageModule { }
