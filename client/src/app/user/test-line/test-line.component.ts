import { Component, Input, OnInit } from '@angular/core';
import { IDelivery } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-test-line',
  templateUrl: './test-line.component.html',
  styleUrls: ['./test-line.component.scss']
})
export class TestLineComponent implements OnInit {
 
  isCollapsed=true

  @Input() currentStep!:number
  constructor(){
    
  }
  
 ngOnInit(): void {

  
 }
}
