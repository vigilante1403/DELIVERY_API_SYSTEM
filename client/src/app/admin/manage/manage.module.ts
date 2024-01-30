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
import { BsModalService } from 'ngx-bootstrap/modal';
import { TestLineComponent } from 'src/app/user/test-line/test-line.component';
import { UserModule } from 'src/app/user/user.module';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [AllOrdersComponent,ManageComponent, AllUsersComponent, AllAgentsComponent, LocationComponent, PaymentStatusComponent, OrderStatusComponent, ServiceComponent, AddLocationComponent, ChartComponent],
  imports: [
    
    CommonModule,
    RouterModule.forChild(manageRoutes),
    FontAwesomeModule,
    FormsModule,
    UserModule,
    NgChartsModule
  ]
})
export class ManageModule { }
