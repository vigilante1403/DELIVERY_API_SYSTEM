import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

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
 constructor(private service:NotifierService){
  this.notifier=service;
 }

  ngOnInit(){
    this.notifier.show({
      type: 'success',
      message: 'You are awesome! I mean it!',
      id: 'THAT_NOTIFICATION_ID', // Again, this is optional
    });
  }

}
