import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { UserDeliveryFetchComponent } from "./user-delivery-fetch/user-delivery-fetch.component";
import { AuthenticationGuard } from "../middleware/authentication.guard";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { DeliveringComponent } from "./delivering/delivering.component";
import { ProfileComponent } from "../profile/profile.component";
import { OrdersFormComponent } from "../user/form/orders-form/orders-form.component";
import { NewCartComponent } from "../user/new-cart/new-cart.component";
import { ForgotPasswordComponent } from "../user/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "../user/change-password/change-password.component";
import { NewCheckoutComponent } from "../user/new-checkout/new-checkout.component";
import { VerifySendToComponent } from "../user/forgot-password/verify-send-to/verify-send-to.component";
import { UpdateUnpaidFormsComponent } from "../user/update-unpaid-forms/update-unpaid-forms.component";
import { CheckoutComponent } from "../user/checkout/checkout.component";

export const EmployeeRoute: Routes = [
    {path: '', component: EmployeeComponent,canActivate:[AuthenticationGuard]},
    {path:'customer/:email/deliveries',component:UserDeliveryFetchComponent,canActivate:[AuthenticationGuard]},
    {path:'customer/:orderId/edit/process',component:UserEditComponent,canActivate:[AuthenticationGuard]},
    {path: 'edit-profile',component:EditProfileComponent,canActivate:[AuthenticationGuard]},
    {path: 'delivering',component:DeliveringComponent,canActivate:[AuthenticationGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthenticationGuard]},
    {path:'order/new',component:OrdersFormComponent,canActivate:[AuthenticationGuard]},
    {path:'order/cart/:customerId/:orderId/checkout',component:CheckoutComponent,canActivate:[AuthenticationGuard]},
    {path:'new-cart',component:NewCartComponent,canActivate:[AuthenticationGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path:"checkout",component:NewCheckoutComponent,canActivate:[AuthenticationGuard]},
    {path: '1/reset/:token', component: VerifySendToComponent},
    {path:'edit/:orderId',component:UpdateUnpaidFormsComponent,canActivate:[AuthenticationGuard]},
    
];