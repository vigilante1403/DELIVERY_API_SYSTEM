import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { IDelivery, IReturnPayInfoParcel, Payment, ReturnParcel, Show } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-processing-table',
  templateUrl: './processing-table.component.html',
  styleUrls: ['./processing-table.component.scss']
})
export class ProcessingTableComponent {
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
constructor(private modalService: BsModalService,private service:DeliveryService,public dialog:MatDialog) {
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
cancelPaidOrderAndDelivery(orderId:number){
  
}
result:string=''
confirmDialog(orderId:number): void {
  this.modalRef?.hide()
  const message = `Are you sure you want to do this?`;

  const dialogData = new ConfirmDialogModel("Confirm Action", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });
 
  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
    if(dialogResult==true){
      this.service.cancelPaidOrderNotPickUpYet(orderId).subscribe({
        next:(res)=>{console.log("Cancel success!")},
        error:(err)=>{console.log(err)}
      })
    }
  });
}
}
