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
contactAddress:string=''
modalRef?: BsModalRef;
items1: number[];
constructor(private modalService: BsModalService,private Service:CheckoutService) {
  this.items1 = Array(15).fill(0);
}

openModal(template: TemplateRef<void>,orderId:any) {
  this.modalRef = this.modalService.show(template);
  var temp=this.details
  this.detail= temp.filter(x=>x.orderId==orderId)[0]
  console.log("Detail ",this.detail)
  this.ConvertContactData(this.detail.orderDTO.contactAddress)
}
ConvertContactData(contactAddress:any){
  var json = JSON.parse(contactAddress);
  var name = json["FullName"]
  var address= json["Address"]
  var phone = json["PhoneNumber"]
  this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
}
}
