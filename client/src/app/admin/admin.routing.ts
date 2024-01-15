import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { FormComponent } from "./dashboard/form/form.component";
import { OrdersComponent } from "./dashboard/orders/orders.component";
import { CustomerFormComponent } from "../form/customer-form/customer-form.component";


export const AdminRoute: Routes = [
    {path: '', component: AdminComponent},
    {path: 'dashboard', component: DashboardComponent,
    children: [
        {path: 'form', component: FormComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'forms', loadChildren: () => import('../form/form.module').then(mod => mod.FormManageModule)}
    ]
    }
    
];