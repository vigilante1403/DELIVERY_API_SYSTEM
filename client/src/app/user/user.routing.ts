import { AuthenticationGuard } from '../middleware/authentication.guard';
import { CartComponent } from './cart/cart.component';
import { OrdersFormComponent } from './form/orders-form/orders-form.component';
import { UserComponent } from './user.component';
import { Routes } from "@angular/router";

export const UserRoute: Routes = [
    {path: '', component: UserComponent,canActivate:[AuthenticationGuard]},
    {path:'order/new',component:OrdersFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId',component:CartComponent,canActivate:[AuthenticationGuard]}
    
];