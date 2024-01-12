import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(public service:DeliveryService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
      // this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
      //   next:(res)=>{console.log('customer Id:'+res.id);this.service.customer=res},
      //   error:(err)=>console.log(err)
      // })
    console.log('customer id la: '+this.service.customer.id)
    try {
      if(this.service.customer.id==''){
        this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
          next:(res)=>{console.log('customer Id:'+res.id);this.service.customer=res},
           error:(err)=>console.log(err)
          })
      }
    } catch (error) {
      
    }finally{
      this.service.getCustomerOrderHistories(this.route.snapshot.paramMap.get('customerId')).subscribe({
        next:(res)=>{this.service.ordersToShow=res},
        error:(err)=>{console.log(err)}
      })
    }
    
     
  }


}
