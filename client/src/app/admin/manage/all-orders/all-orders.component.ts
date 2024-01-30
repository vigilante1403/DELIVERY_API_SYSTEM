import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManageService } from '../manage.service';
import { ICountry, IDelivery, IDeliveryAgent, IDeliveryStatus, IOrderShow, IOrderShow2, IPayment, IPaymentStatus, IReturnPayInfoParcel, IService, IUser, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DeliveryService } from 'src/app/service/delivery.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
  storedServices:IService[]=[]
  storedOrderStatus:IDeliveryStatus[]=[]
  storedPaymentStatus:IDeliveryStatus[]=[]
  backupOrderToShow: IOrderShow2[]=[]
  storedUsers:IUser[]=[]
  storedDeliveries:IDelivery[]=[]
  allId:any=[]
  data:IReturnPayInfoParcel[]=[]
  storedCountries:ICountry[]=localStorage.getItem('storedCountries1')!=null?JSON.parse(localStorage.getItem('storedCountries1')!):[]
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  selected4: boolean = false;
  selected5: boolean = false;
  keyword: string ="";
  selectedService:string=''
  selectedOrderStatus:string=''
  selectedPaymentStatus:string=''
  selectedRoute:string=''
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
  detail:IReturnPayInfoParcel=({
    orderId:0,
      orderDTO:new Show(),
      returnParcels:[new ReturnParcel()],
      returnPayment:new Payment()
  })
  deliveryDetail:IDelivery=({
    id:0,
      orderId:0,
      deliveryAgentName:'',
      orderPaymentId:0,
      pickUpDateTime:new Date(),
      deliveryDate:new Date(),
      deliveryStatusName:'',
      codMoney:0
  })
  contactAddress:string=''
  senderAddress:string=''
  modalRef?: BsModalRef;
constructor(private modalService: BsModalService,public service:ManageService,public mapService:MapService,public deliveryService:DeliveryService){}
ngOnInit(){
  this.mapService.fetchAllCountries().subscribe({
    next:(res)=>{this.storedCountries=res;console.log("Countries: ",res);localStorage.setItem('storedCountries1',JSON.stringify(res))},
    error:(err)=>{console.log(err)}
  })
  this.service.getAllUsers().subscribe({
    next:(res)=>{this.storedUsers=res},
    error:(err)=>{console.log(err)}
  })
  this.deliveryService.fetchAllDeliveryType().subscribe({
    next:(res)=>{this.storedServices=res},
    error:(err)=>{console.log(err)}
  })
  this.deliveryService.fetchAllDeliveryStatus().subscribe({
    next:(res)=>{this.storedOrderStatus=res},
    error:(err)=>{console.log(err)}
  })
  this.deliveryService.fetchAllPaymentStatus().subscribe({
    next:(res)=>{this.storedPaymentStatus=res},
    error:(err)=>{console.log(err)}
  })
  this.deliveryService.fetchAllDeliveries().subscribe({
    next:(res)=>{this.storedDeliveries=res;this.filterAllDeliveriesWithOrderIds(res)},
    error:(err)=>{console.log(err)}
  })
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
getServiceChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedService=val;
  console.log("New val of service:",this.selectedService)
}
getOrderStatusChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedOrderStatus=val;
}
getPaymentStatusChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedPaymentStatus=val;
}
getRouteChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedRoute=val;
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
      sendAddress2 = element.senderInfo?.substring(sender+9,sender2-8)!;
    }
    var address2 = ''
    var sendAddress3=''
    var contact = element.contactAddress.indexOf("District")!
    var contact2 =element.contactAddress?.indexOf("PhoneNumber")!
    if(contact==null){
      address2='Unknown'
    }else{
      address2= element.contactAddress.substring(contact+9)!;
      sendAddress3 = element.contactAddress?.substring(contact+9,contact2-8)!;
    }
    console.log("send2 la: ",sendAddress2,"-",sendAddress3)
    var temppp = this.storedCountries
    console.log("stored Countries la: ",temppp)
    var stateNum1 = temppp.filter(x=>x.name==sendAddress2)[0].state
    console.log(stateNum1)
    var tempppp=this.storedCountries
    var stateNum2 = tempppp.filter(x=>x.name==sendAddress3)[0].state
    console.log(stateNum2)
    var state=''
    if(stateNum1==stateNum2){
      state='same'
    }else{
      state='diff'
    }
    var addressNew = sendAddress2+" - "+sendAddress3
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
    route:addressNew,
    state:state
    })
    this.ordersToShow.push(newOrder)
    this.backupOrderToShow.push(newOrder);
  });
}

receiveKeyword(event: Event) {
 
  let target = event.target as HTMLInputElement;
    this.keyword = target.value;
   
   
  }
  
  sortRoute() {
    if(this.selected == true) {
      this.ordersToShow.sort((a,b) => a.route.localeCompare(b.route));
    } else {
      this.ordersToShow.sort((a,b) => b.route.localeCompare(a.route));
    }
  
  }
  searchButton(){
    var temp=this.backupOrderToShow
    if(this.selectedService!='-1'){
      temp = temp.filter(x=>x.service.includes(this.selectedService))
    }
    if(this.selectedOrderStatus!='-1'){
      temp=temp.filter(x=>x.orderStatus.includes(this.selectedOrderStatus))
    }
    if(this.selectedPaymentStatus!='-1'){
      temp=temp.filter(x=>x.orderPaymentStatus.includes(this.selectedPaymentStatus))
    }
    if(this.selectedRoute!='-1'){
      temp=temp.filter(x=>x.state?.includes(this.selectedRoute))
    }
    if(this.keyword!=""){
      if(this.keyword.includes("@")){
        var users = this.storedUsers
        var user = users.filter(x=>x.email.includes(this.keyword))[0].id
        temp=temp.filter(x=>x.customerId.includes(user))
      }else{
        temp=temp.filter(x=>x.customerId.includes(this.keyword))
      }
      
    }
    this.ordersToShow=temp
  }
  @ViewChild('search') search!:ElementRef
  refreshButton(){
    this.ordersToShow=this.backupOrderToShow
    this.search.nativeElement.value=""
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
  filterAllDeliveriesWithOrderIds(deliveries:IDelivery[]){
    var temp = deliveries
    temp.forEach(element => {
      var orderId = element.orderId
      this.allId.push(orderId)
    });
    this.deliveryService.fetchAllDetailsRequired(this.allId).subscribe({
      next:(res)=>{console.log("Require",res);this.data=res},
      error:(err)=>{console.log(err)}
    })
  }
  openModal(template: TemplateRef<void>,orderId:any) {
    this.modalRef = this.modalService.show(template);
    var temp=this.data
    this.detail= temp.filter(x=>x.orderId==orderId)[0]
    console.log("Detail ",this.detail)
    this.ConvertContactData(this.detail.orderDTO.contactAddress)
    this.ConvertSenderData(this.detail.orderDTO.senderInfo!)
    var temp2= this.storedDeliveries
    this.deliveryDetail = temp2.filter(x=>x.orderId==orderId)[0]
    console.log("Detail la:",this.deliveryDetail)
    this.checkStep()
  }
  currentStep:number=0
  checkStep(){
    const pickUp = new Date(this.deliveryDetail.pickUpDateTime)
    const deliveryDate = new Date(this.deliveryDetail.deliveryDate)
    var date = new Date()
  if (date < pickUp) {
    this.currentStep = 1;
  } else if(date.getTime()==pickUp.getTime()){
    this.currentStep=2
  }
   else if (date >= pickUp && date < deliveryDate) {
    this.currentStep = 3;
  } else if (date >= deliveryDate) {
    this.currentStep = 4;
  }
  console.log("Current Step: ",this.currentStep)
  }
  closeModal(){
    this.modalRef?.hide()
  }
  ConvertContactData(contactAddress:any){
    var json = JSON.parse(contactAddress);
    var name = json["FullName"]
    var address= json["Address"]
    var phone = json["PhoneNumber"]
    this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
  }
  ConvertSenderData(senderAddress:any){
    var json = JSON.parse(senderAddress);
    var name = json["FullName"]
    var address= json["Address"]
    var phone = json["PhoneNumber"]
    this.senderAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
  }
}
