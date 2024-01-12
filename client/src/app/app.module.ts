
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { FormManageModule } from './form/form.module';
import { ModalManageModule } from './nav-bar/modal/modal.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalComponent } from './nav-bar/modal/modal.component';
import { LoginComponent } from './nav-bar/modal/login/login.component';
import { SignupComponent } from './nav-bar/modal/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './middleware/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ModalComponent,
    LoginComponent,SignupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CarouselModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['https://localhost:7000','https://localhost:7000/api/Authorize'], // replace with your API domain
        // disallowedRoutes: ['https://localhost:7000/api/Account/login'], // replace with your login API route
      },
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},BsModalService,],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
 
})
export class AppModule { }
