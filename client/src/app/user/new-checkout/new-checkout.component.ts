import { Component, OnInit } from '@angular/core';
import { IDelivery, IOrderShow, IReturnPayInfoParcel } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-new-checkout',
  templateUrl: './new-checkout.component.html',
  styleUrls: ['./new-checkout.component.scss']
})
export class NewCheckoutComponent {
  activeTab = 'waiting';
  customerId=''
  search(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  result(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  //get all payment
 payments:IReturnPayInfoParcel[]=[]
 donePayments:IReturnPayInfoParcel[]=[]
 waitingPayments:IReturnPayInfoParcel[]=[]
  constructor(private service:DeliveryService){

  }
  ngOnInit(): void {
    if(this.service.customer.id==''||true){
      try {
        this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
          next:(res)=>{console.log('customer Id:'+res.id);this.customerId=res.id;this.service.customer=res;this.getPayments(res.id)},
           error:(err)=>console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
    
    
  }
  getPayments(customerId:any){
    this.service.fetchAllPayments(customerId).subscribe({
      next:(res)=>{console.log(res);this.payments=res;this.filterDoneWaitingPayments(res)},
      error:(err)=>{console.log(err)}
    })
  }
  filterDoneWaitingPayments(payments:IReturnPayInfoParcel[]){
    payments.forEach(element => {
      if(element.returnPayment.orderPaymentStatus=="done"){
        this.donePayments.push(element);
      }else{
        this.waitingPayments.push(element)
      }
    });
  }
}
