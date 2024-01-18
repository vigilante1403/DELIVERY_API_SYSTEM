import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IOrderStatus } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  storedStatus:IOrderStatus[]=[]
constructor(private service:ManageService){}
ngOnInit(): void {
    this.service.getAllOrderStatus().subscribe({
      next:(res)=>{this.storedStatus=res},
      error:(err)=>{console.log(err)}
    })
}

}
