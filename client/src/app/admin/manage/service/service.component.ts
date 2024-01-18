import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  storedServices:IService[]=[]
  constructor(private service:DeliveryService){}
  ngOnInit(): void {
      this.service.fetchAllDeliveryType().subscribe({
        next:(res)=>{this.storedServices=res},
        error:(err)=>{console.log(err)}
      })
  }

}
