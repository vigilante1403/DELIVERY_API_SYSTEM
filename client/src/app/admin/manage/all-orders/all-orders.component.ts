import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IDeliveryAgent, IOrderShow, IOrderShow2, IPayment, IPaymentStatus } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


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
  backupOrderToShow: IOrderShow2[]=[]
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  selected4: boolean = false;
  selected5: boolean = false;
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;

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
    this.backupOrderToShow.push(newOrder);
  });
}

receiveKeyword(event: Event) {
 
  let target = event.target as HTMLInputElement;
    this.keyword = target.value;
   
    this.searchData();
  }
  searchData() {
   
    this.ordersToShow = this.ordersToShow.filter(item => item.service.includes(this.keyword));
  
    if(this.keyword===''){
      this.ordersToShow = this.backupOrderToShow;
    }
  }
  sortRoute() {
    if(this.selected == true) {
      this.ordersToShow.sort((a,b) => a.route.localeCompare(b.route));
    } else {
      this.ordersToShow.sort((a,b) => b.route.localeCompare(a.route));
    }
  
  }
  sortService() {
    if(this.selected2 == true) {
      this.ordersToShow.sort((a,b) => a.service.localeCompare(b.service));
    } else {
      this.ordersToShow.sort((a,b) => b.service.localeCompare(a.service));
    }
  
  }
  sortOrderStatus() {
    if(this.selected3 == true) {
      this.ordersToShow.sort((a,b) => a.orderStatus.localeCompare(b.orderStatus));
    } else {
      this.ordersToShow.sort((a,b) => b.orderStatus.localeCompare(a.orderStatus));
    }
  
  }
  sortPaymentStatus() {
    if(this.selected4 == true) {
      this.ordersToShow.sort((a,b) => a.orderPaymentStatus.localeCompare(b.orderPaymentStatus));
    } else {
      this.ordersToShow.sort((a,b) => b.orderPaymentStatus.localeCompare(a.orderPaymentStatus));
    }
  
  }
  sortCustomerId() {
    if(this.selected5 == true) {
      this.ordersToShow.sort((a,b) => a.customerId.localeCompare(b.customerId));
    } else {
      this.ordersToShow.sort((a,b) => b.customerId.localeCompare(a.customerId));
    }
  
  }

    
  onSortRoute() {
    this.selected =!this.selected;
    this.sortRoute();
  }
  onSortService() {
    this.selected2 =!this.selected2;
    this.sortService();
  }
  onSortOrderStatus() {
    this.selected3 =!this.selected3;
    this.sortOrderStatus();
  }
  
    
  onSortPaymentStatus() {
    this.selected4 =!this.selected4;
    this.sortPaymentStatus();
  }
  

    
  onSortCustomerId() {
    this.selected5 =!this.selected5;
    this.sortCustomerId();
  }
}
