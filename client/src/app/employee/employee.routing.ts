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
    {path: '', component: EmployeeComponent},
    {path:'customer/:email/deliveries',component:UserDeliveryFetchComponent},
    {path:'customer/:orderId/edit/process',component:UserEditComponent},
    {path: 'edit-profile',component:EditProfileComponent},
    {path: 'delivering',component:DeliveringComponent},
    {path:'profile',component:ProfileComponent},
    {path:'order/new',component:OrdersFormComponent},
    {path:'order/cart/:customerId/:orderId/checkout',component:CheckoutComponent},
    {path:'new-cart',component:NewCartComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path:"checkout",component:NewCheckoutComponent},
    {path:'edit/:orderId',component:UpdateUnpaidFormsComponent},
    
];