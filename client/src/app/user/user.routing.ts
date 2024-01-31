import { EditProfileComponent } from '../employee/edit-profile/edit-profile.component';
import { AuthenticationGuard } from '../middleware/authentication.guard';
import { PeriodComponent } from '../period/period.component';
import { ProfileComponent } from '../profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifySendToComponent } from './forgot-password/verify-send-to/verify-send-to.component';
import { AddPackageFormComponent } from './form/add-package-form/add-package-form.component';
import { AddressFormComponent } from './form/address-form/address-form.component';
import { OrdersFormComponent } from './form/orders-form/orders-form.component';
import { NewCartComponent } from './new-cart/new-cart.component';
import { NewCheckoutComponent } from './new-checkout/new-checkout.component';
import { TestLineComponent } from './test-line/test-line.component';
import { UpdateUnpaidFormsComponent } from './update-unpaid-forms/update-unpaid-forms.component';
import { UserComponent } from './user.component';
import { Routes } from "@angular/router";

export const UserRoute: Routes = [
    {path: '', component: UserComponent},
    {path:'order/new',component:OrdersFormComponent},
    {path:'order/cart/:customerId',component:CartComponent},
    {path:'order/cart/:customerId/:orderId/add-package',component:AddPackageFormComponent},
    {path:'order/cart/:customerId/:orderId/add-addresses',component:AddressFormComponent},
    {path:'order/cart/:customerId/:orderId/checkout',component:CheckoutComponent},
    {path:'new-cart',component:NewCartComponent},

    {path: 'change-password', component: ChangePasswordComponent},
    {path:"checkout",component:NewCheckoutComponent},
    {path:'edit/:orderId',component:UpdateUnpaidFormsComponent},
    {path:'profile',component:ProfileComponent},
    {path:'period',component:PeriodComponent},
    {path: 'edit-profile',component:EditProfileComponent},
    
];