import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IDeliveryAgent, IOrderShow, IOrderShow2, IPayment, IPaymentStatus } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  storedOrders:IOrderShow[]=[]
  storedExpress:IDeliveryAgent[]=[]
  storedPayments:IPayment[]=[]
  ordersToShow:IOrderShow2[]=[]

constructor(public service:ManageService,public mapService:MapService){}
ngOnInit(){
  this.service.getAllOrders().subscribe({
    next:(res)=>{console.log(res);
    this.storedOrders=res;localStorage.setItem('storedOrders',JSON.stringify(res))},
    error:(err)=>{console.log(err)}
  })
  this.mapService.fetchAllExpress().subscribe({
    next:(res)=>{console.log(res);this.storedExpress=res;localStorage.setItem('storedExpress',JSON.stringify(res))},
    error:(err)=>{console.log(err)}
  })
  this.mapService.fetchAllOrderPayments().subscribe({
    next:(res)=>{console.log(res);this.storedPayments=res;localStorage.setItem('storedPayments',JSON.stringify(res))},
    error:(err)=>{console.log(err)}
  })
  this.splitAddressToRoute(JSON.parse(localStorage.getItem('storedOrders')!),JSON.parse(localStorage.getItem('storedExpress')!),JSON.parse(localStorage.getItem('storedPayments')!))
 
}
splitAddressToRoute(res:IOrderShow[],res2:IDeliveryAgent[],res3:IPayment[]){
  var temp = res
  temp.forEach(element => {
    var sender = element.senderInfo?.indexOf("District")!
    var sender2 =element.senderInfo?.indexOf("PhoneNumber")!
    var address1='';
    var sendAddress2=''
    if(sender==null){
      address1='Unknown'
    }else{
      address1= element.senderInfo?.substring(sender+9)!;
      sendAddress2 = element.senderInfo?.substring(sender+9,sender2-7)!;
    }
    var address2 = ''
    var sendAddress3=''
    var contact = element.contactAddress.indexOf("District")!
    var contact2 =element.contactAddress?.indexOf("PhoneNumber")!
    if(contact==null){
      address2='Unknown'
    }else{
      address2= element.contactAddress.substring(contact+9)!;
      sendAddress3 = element.contactAddress?.substring(contact+9,contact2-7)!;
    }
    console.log("send2 la: ",sendAddress2,"-",sendAddress3)
    var addressNew = sendAddress2+"- "+sendAddress3
    if(addressNew.length<11){
      addressNew="Not Update"
    }
    var tempExpress = res2
    var agentName=''
    if(element.deliveryAgentId==null){
      agentName='Unknown'
    }else{
      agentName = tempExpress.filter(r=>r.id==element.deliveryAgentId)[0].agentName
    }
    var tempPayment = res3
    var paymentStatus:IPayment
    var status=''
    if(element.orderPaymentId==null){
      status="Not establish"
    }else{
      status = tempPayment.filter(x=>x.id==element.orderPaymentId)[0].orderPaymentStatus
    }

    var newOrder:IOrderShow2=({
      id:element.id,
    service:element.service,
    customerId:element.customerId,
    prePaid:element.prePaid,
    orderDate:element.orderDate,
    orderStatus:element.orderStatus,
    orderPaymentStatus:status,
    deliveryAgent:agentName,
    route:addressNew
    })
    this.ordersToShow.push(newOrder)
  });
}
}
