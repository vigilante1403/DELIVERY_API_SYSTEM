import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivery, IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-delivering-table',
  templateUrl: './delivering-table.component.html',
  styleUrls: ['./delivering-table.component.scss']
})
export class DeliveringTableComponent {
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
constructor(private modalService: BsModalService,private router:Router) {
  this.items1 = Array(15).fill(0);
}

openModal(template: TemplateRef<void>,orderId:any) {
  this.modalRef = this.modalService.show(template);
  var temp=this.details
  this.detail= temp.filter(x=>x.orderId==orderId)[0]
  console.log("Detail ",this.detail)
  this.ConvertContactData(this.detail.orderDTO.contactAddress)
  var temp2= this.items
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
ConvertContactData(contactAddress:any){
  var json = JSON.parse(contactAddress);
  var name = json["FullName"]
  var address= json["Address"]
  var phone = json["PhoneNumber"]
  this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
}
closeModal(){
  this.modalRef?.hide()
}
redirectCancelPage(orderId:any){
  this.modalRef?.hide()
  var url = "/user/cancel-order-submit/"+orderId
  this.router.navigateByUrl(url)

}
}
