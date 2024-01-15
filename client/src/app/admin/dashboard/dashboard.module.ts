import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { OrdersComponent } from './orders/orders.component';

const routes : Routes =[
  {
    path: '' , component: DashboardComponent,
   
  },

]

@NgModule({
  declarations: [
    DashboardComponent,
    FormComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,  
    CollapseModule.forRoot(),
    FontAwesomeModule
  ]
})
export class DashboardModule { }
