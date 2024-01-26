import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDelivery, IReturnPayInfoParcel } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-user-delivery-fetch',
  templateUrl: './user-delivery-fetch.component.html',
  styleUrls: ['./user-delivery-fetch.component.scss']
})
export class UserDeliveryFetchComponent implements OnInit  {
  customerId:string=localStorage.getItem('delivery-customer')!=null?localStorage.getItem('delivery-customer')!:''
  userEmail:string=''
  deliveries:IDelivery[]=[]
  outDeliveries:IDelivery[]=[]
  transitDeliveries:IDelivery[]=[]
  finishDeliveries:IDelivery[]=[]
  allId:any=[]
  outDetails:IReturnPayInfoParcel[]=[]
  inDetails:IReturnPayInfoParcel[]=[]
  doneDetails:IReturnPayInfoParcel[]=[]
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private service:DeliveryService){
    var data = this.router.getCurrentNavigation()?.extras.state?.['data']
    if(data!=null){
      localStorage.setItem('delivery-customer',data);
      this.customerId=data
    }
    this.userEmail=this.activatedRoute.snapshot.paramMap.get('email')!
  }

ngOnInit(): void {
  this.service.updateStatusDeliveries(this.customerId).subscribe({
    next:(res)=>{console.log(res)},
    error:(err)=>{console.log(err)}
  })
  this.service.fetchAllDeliveriesOfSpecificCustomer(this.customerId).subscribe({
    next:(res)=>{console.log(res);this.deliveries=res;this.filterAllDeliveriesWithOrderIds(res);this.filter1(res);this.filter2(res);this.filter3(res)},
    error:(err)=>{console.log(err)}
  })
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
activeTab = 'delivering';
  search(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }

  result(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault();
    this.activeTab = activeTab;
  }
}
