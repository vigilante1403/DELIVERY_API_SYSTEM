import { AuthenticationGuard } from '../middleware/authentication.guard';
import { CartComponent } from './cart/cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddPackageFormComponent } from './form/add-package-form/add-package-form.component';
import { AddressFormComponent } from './form/address-form/address-form.component';
import { OrdersFormComponent } from './form/orders-form/orders-form.component';
import { NewCartComponent } from './new-cart/new-cart.component';
import { NewCheckoutComponent } from './new-checkout/new-checkout.component';
import { UserComponent } from './user.component';
import { Routes } from "@angular/router";

export const UserRoute: Routes = [
    {path: '', component: UserComponent,canActivate:[AuthenticationGuard]},
    {path:'order/new',component:OrdersFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId',component:CartComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId/:orderId/add-package',component:AddPackageFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId/:orderId/add-addresses',component:AddressFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId/:orderId/checkout',component:CheckoutComponent,canActivate:[AuthenticationGuard]},
    {path:'new-cart',component:NewCartComponent,canActivate:[AuthenticationGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'change-password', component: ChangePasswordComponent,canActivate:[AuthenticationGuard]},
    {path:'checkout',component:NewCheckoutComponent,canActivate:[AuthenticationGuard]}
    
];