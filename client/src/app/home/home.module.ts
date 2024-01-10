import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';
import { HomeRoute } from './home.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,

    RouterModule.forChild(HomeRoute)
  ],
  exports:[],
 
 

  
})
export class HomeModule { }
