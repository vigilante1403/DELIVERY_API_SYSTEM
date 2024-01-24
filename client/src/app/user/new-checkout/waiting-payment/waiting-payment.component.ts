import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';
import { CheckoutService } from '../../checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryService } from 'src/app/service/delivery.service';
import { delay } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';


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
      
    }
  constructor(private modalService: BsModalService,private toastr:ToastrService,private service:DeliveryService,private router:Router) {
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
   
  changeDetails(orderId:any){
    var url = "/user/edit/"+orderId
    this.service.fetchEditData(orderId).subscribe({
      
      next:(res)=>{console.log(res);
        this.modalRef?.hide();delay(2000); this.router.navigate([url], {
          state: {
            data: JSON.stringify(res)
          },
        });},
      error:(err)=>{console.log(err)}
    })
  }
  
}
