
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalComponent } from './nav-bar/modal/modal.component';
import { LoginComponent } from './nav-bar/modal/login/login.component';
import { SignupComponent } from './nav-bar/modal/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './middleware/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
// import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { AddressFormComponent } from './user/form/address-form/address-form.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { IconPickerModule } from 'ngx-icon-picker';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProfileComponent } from './profile/profile.component';
import { PeriodComponent } from './period/period.component';
import { PeriodService } from './period/period.service';
import {NotifierModule} from 'angular-notifier'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ModalComponent,
    LoginComponent,SignupComponent,
    AddressFormComponent,
    CheckoutComponent,
    SidebarComponent,
    AdminSidebarComponent,
    EmployeeSidebarComponent,
    ProfileComponent,
    PeriodComponent
  ],
  imports: [
   AgmCoreModule.forRoot({
    apiKey: "AIzaSyCwrRsY8vEyGBrnJ4jWFWJa_6lAuVVX77o",
    libraries: ["places", "geometry"]
}),
    // GoogleMapsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CarouselModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    NotifierModule.withConfig({
      position: {

        horizontal: {
      
          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right',
      
          /**
           * Defines the horizontal distance to the screen edge (in px)
           * @type {number}
           */
          distance: 12
      
        },
      
        vertical: {
      
          /**
           * Defines the vertical position on the screen
           * @type {'top' | 'bottom'}
           */
          position: 'top',
      
          /**
           * Defines the vertical distance to the screen edge (in px)
           * @type {number}
           */
          distance: 12,
      
          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * @type {number}
           */
          gap: 10
      
        }
      
      }
    })
    ,
 
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['https://localhost:7000','https://localhost:7000/api/Authorize'], // replace with your API domain
        // disallowedRoutes: ['https://localhost:7000/api/Account/login'], // replace with your login API route
      },
    }),
       AlertModule.forRoot(),


   
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},BsModalService,{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
 
})
export class AppModule { }
