import { animate, style, transition } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
 
})

export class HomeComponent implements OnInit {
  
  private readonly notifier: NotifierService;
 constructor(private service:NotifierService, private spinner: NgxSpinnerService){
  this.notifier=service;
  
 }
 
  ngOnInit(){
    this.notifier.show({
      type: 'info',
      message: 'You are awesome! I mean it!',
      id: 'THAT_NOTIFICATION_ID',
    });
    

    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
      setTimeout(()=>{
        this.notifier.hide('THAT_NOTIFICATION_ID');
      },1000)
    },1500)
  }
  
}
