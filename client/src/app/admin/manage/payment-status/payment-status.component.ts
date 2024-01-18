import { Component, OnInit } from '@angular/core';
import { IPaymentStatus } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  storedStatus:IPaymentStatus[]=[]
constructor(private service:MapService){}
ngOnInit(): void {
    this.service.fetchAllOrderPaymentStatus().subscribe({
      next:(res)=>{this.storedStatus=res},
      error:(err)=>{console.log(err)}
    })
}

}
