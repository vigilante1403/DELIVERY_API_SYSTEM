import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';
import { CheckoutService } from '../../checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-waiting-payment',
  templateUrl: './waiting-payment.component.html',
  styleUrls: ['./waiting-payment.component.scss']
})
export class WaitingPaymentComponent implements OnInit {
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
  
    orderId:number=0;
    ngOnInit(){
      this.toastr.success("Hi","Waiting")
    }
  constructor(private modalService: BsModalService,private toastr:ToastrService) {
    this.items1 = Array(15).fill(0);
  }
  receiveFromChild(data:any){
    this.modalRef?.hide()
  }
  openModal(template: TemplateRef<void>,orderId:any) {
    
    this.modalRef = this.modalService.show(template);
    var temp=this.details
    this.detail= temp.filter(x=>x.orderId==orderId)[0]
    this.orderId=orderId
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
