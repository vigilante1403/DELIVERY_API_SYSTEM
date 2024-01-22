
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    AdminSidebarComponent
  ],
  imports: [
   AgmCoreModule.forRoot({
    apiKey: "AIzaSyCwrRsY8vEyGBrnJ4jWFWJa_6lAuVVX77o",
    libraries: ["places", "geometry"]
}),
    // GoogleMapsModule,
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
