
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './modal/login/login.component';
import { SignupComponent } from './modal/signup/signup.component';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
// import { ModalService } from './modal/modal.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    ModalComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    EmployeeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    CarouselModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
 
})
export class AppModule { }
