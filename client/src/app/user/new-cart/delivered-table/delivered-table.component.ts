import { AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivery, IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';
import { CheckoutService } from '../../checkout/checkout.service';

@Component({
  selector: 'app-delivered-table',
  templateUrl: './delivered-table.component.html',
  styleUrls: ['./delivered-table.component.scss']
})
export class DeliveredTableComponent  {
 
@Input() items!:IDelivery[]
@Input() details!:IReturnPayInfoParcel[]
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
modalRef?: BsModalRef;
items1: number[];
constructor(private modalService: BsModalService,private Service:CheckoutService) {
  this.items1 = Array(15).fill(0);
}

openModal(template: TemplateRef<void>,orderId:any) {
  var temp2= this.items
  this.deliveryDetail = temp2.filter(x=>x.orderId==orderId)[0]
  console.log("Detail la:",this.deliveryDetail)
  this.modalRef = this.modalService.show(template);
  var temp=this.details
  this.detail= temp.filter(x=>x.orderId==orderId)[0]
  console.log("Detail ",this.detail)
  this.checkStep()
  this.ConvertContactData(this.detail.orderDTO.contactAddress)
  
}
currentStep:number=0
checkStep(){
  const pickUp = new Date(this.deliveryDetail.pickUpDateTime)
  const deliveryDate = new Date(this.deliveryDetail.deliveryDate)
  var date = new Date()
if (date < pickUp) {
  this.currentStep = 2;
} else if (date >= pickUp && date < deliveryDate) {
  this.currentStep = 3;
} else if (date >= deliveryDate) {
  this.currentStep = 4;
}
console.log("Current Step: ",this.currentStep)
}
ConvertContactData(contactAddress:any){
  var json = JSON.parse(contactAddress);
  var name = json["FullName"]
  var address= json["Address"]
  var phone = json["PhoneNumber"]
  this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
}
}
