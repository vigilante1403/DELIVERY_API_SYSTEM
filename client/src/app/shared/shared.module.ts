import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule,CarouselConfig } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../nav-bar/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../nav-bar/modal/login/login.component';
import { SignupComponent } from '../nav-bar/modal/signup/signup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[ReactiveFormsModule,
    FormsModule]
  
 
})
export class SharedModule { }
