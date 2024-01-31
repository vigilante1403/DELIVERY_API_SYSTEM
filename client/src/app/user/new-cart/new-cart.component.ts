import { Component, OnInit } from '@angular/core';
import { IDelivery, IOrderShow, IReturnPayInfoParcel } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-new-cart',
  templateUrl: './new-cart.component.html',
  styleUrls: ['./new-cart.component.scss']
})
export class NewCartComponent implements OnInit {
  activeTab = 'delivering';
  search(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  result(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
  //get all delivery
  allId:any=[]
  unfinished:IOrderShow[]=[]
  deliveries:IDelivery[]=[]
  outDeliveries:IDelivery[]=[]
  outDetails:IReturnPayInfoParcel[]=[]
  inDetails:IReturnPayInfoParcel[]=[]
  doneDetails:IReturnPayInfoParcel[]=[]
  transitDeliveries:IDelivery[]=[]
  finishDeliveries:IDelivery[]=[]
  customerId:string=''

  constructor(private service:DeliveryService){

  }
  ngOnInit(): void {
    if(this.service.customer.id==''||true){
      try {
        this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
          next:(res)=>{console.log('customer Id:'+res.id);this.customerId=res.id;this.service.customer=res;
          this.service.updateStatusDeliveries(res.id).subscribe({
            next:(res)=>{console.log(res)},
            error:(err)=>{console.log(err)}
          })
        
          this.service.fetchAllDeliveriesOfSpecificCustomer(res.id).subscribe({
            next:(res)=>{console.log(res);this.deliveries=res;this.filterAllDeliveriesWithOrderIds(res);this.filter1(res);this.filter2(res);this.filter3(res)},
            error:(err)=>{console.log(err)}
          })
          this.service.fetchAllUnFinishedOrders(res.id).subscribe({
            next:(res)=>{console.log(res);this.unfinished=res},
            error:(err)=>{console.log(err)}
          })
        },
           error:(err)=>console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
    
    
    
  }
  filter1(data:IDelivery[]){
    var temp = data;
    this.finishDeliveries=temp.filter(x=>x.deliveryStatusName=="Delivered")
  }
  filter2(data:IDelivery[]){
    var temp=data;
    this.outDeliveries=temp.filter(x=>x.deliveryStatusName=="Out for delivery")
    
  }
  filter3(data:IDelivery[]){
    var temp=data;
    this.transitDeliveries =temp.filter(x=>x.deliveryStatusName=="In Transit")
  }
  filterAllDeliveriesWithOrderIds(deliveries:IDelivery[]){
    var temp = deliveries
    temp.forEach(element => {
      var orderId = element.orderId
      this.allId.push(orderId)
    });
    this.service.fetchAllDetailsRequired(this.allId).subscribe({
      next:(res)=>{console.log("Require",res);this.filterDetails(res)},
      error:(err)=>{console.log(err)}
    })
  }
  filterDetails(data:IReturnPayInfoParcel[]){
    data.forEach(element => {
      var deliveryStatusName = element.orderDTO.orderStatus
      if(deliveryStatusName=="delivered"){
        this.doneDetails.push(element);
      }else if(deliveryStatusName=="delivering"){
        this.outDetails.push(element)
      }else if(deliveryStatusName=="processing"){
        this.inDetails.push(element)
      }
    });
  }
  
}
