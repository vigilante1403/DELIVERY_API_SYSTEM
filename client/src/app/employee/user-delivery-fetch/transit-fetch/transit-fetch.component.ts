import { Component, Input, TemplateRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { delay } from 'rxjs';
import { IDelivery, IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-transit-fetch',
  templateUrl: './transit-fetch.component.html',
  styleUrls: ['./transit-fetch.component.scss']
})
export class TransitFetchComponent {
  @Input() items!:IDelivery[]
  @Input() details!:IReturnPayInfoParcel[]
  detail:IReturnPayInfoParcel=({
    orderId:0,
      orderDTO:new Show(),
      returnParcels:[new ReturnParcel()],
      returnPayment:new Payment()
  })
  contactAddress:string=''
  senderAddress:string=''
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
  this.ConvertSenderData(this.detail.orderDTO.senderInfo)
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
changeDetails(orderId:any){
  this.modalRef?.hide()
  delay(1000)
var url="/employee/customer/"+orderId+"/edit/process"
const extras:NavigationExtras={
  state:{
    data:{
      contact: this.contactAddress,
      sender: this.senderAddress
    }
  }
}
this.router.navigate([url],extras)

}
}
