import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { RouterModule } from '@angular/router';
import { manageRoutes } from './manage.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageComponent } from './manage.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllAgentsComponent } from './all-agents/all-agents.component';
import { LocationComponent } from './location/location.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ServiceComponent } from './service/service.component';
import { AddLocationComponent } from './location/action/add-location/add-location.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AllOrdersComponent,ManageComponent, AllUsersComponent, AllAgentsComponent, LocationComponent, PaymentStatusComponent, OrderStatusComponent, ServiceComponent, AddLocationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(manageRoutes),
    FontAwesomeModule,
    FormsModule
  ]
})
export class ManageModule { }
