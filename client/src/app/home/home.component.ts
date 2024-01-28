import { Component, OnInit } from '@angular/core';
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
export class HomeComponent  {
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
    setTimeout(()=>{
      this.notifier.hide('THAT_NOTIFICATION_ID');
    },2000)


    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },2000)
  }

}
