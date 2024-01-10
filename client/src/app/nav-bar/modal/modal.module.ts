import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ModalComponent } from './modal.component';
import { SharedModule } from '../../shared/shared.module';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    CarouselModule,
    BrowserAnimationsModule,
    BrowserModule
    
  ],
  exports:[],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalManageModule { }
