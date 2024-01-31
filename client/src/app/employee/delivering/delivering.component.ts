import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ManageService } from 'src/app/admin/manage/manage.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { IDelivering, IDelivery, IOrderShow } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-delivering',
  templateUrl: './delivering.component.html',
  styleUrls: ['./delivering.component.scss']
})
export class DeliveringComponent implements OnInit{
  items:IDelivering[]=[]
  deliveries:IDelivery[]=[]
  storedRequires:any=[]
  modalRef?: BsModalRef;
  orderId:number=0
  storedOrders:IOrderShow[]=[]
constructor(private modalService: BsModalService,private service:DeliveryService,private manage:ManageService,public dialog:MatDialog
  ,private router:Router) {
  this.service.updateAllDeliveries().subscribe({
    next:(res)=>{console.log(res)},
    error:(err)=>{console.log(err)}
  })
 
 
}
ngOnInit(): void {
  this.service.getAllCancel().subscribe({
    next:(res)=>{
      this.storedRequires=res
      this.manage.getAllOrders().subscribe({
        next:(res)=>{
        this.storedOrders=res;localStorage.setItem('storedOrders',JSON.stringify(res));
        this.service.fetchAllOutGoingDeliveries().subscribe({
          next:(res)=>{this.deliveries=res; localStorage.setItem('deliveries',JSON.stringify(res));
          this.splitAddressToRoute(
            this.storedOrders,
            res
          );},
          error:(err)=>{console.log(err)}
        })
      },
        error:(err)=>{console.log(err)}
      })
    },
    error:(err)=>{console.log(err)}
  })
  
  
  
}
openModal(template: TemplateRef<void>,orderId:number) {
  this.modalRef = this.modalService.show(template);
  this.orderId=orderId
  
}
closeModal(data:any){
  this.modalRef?.hide()
}

splitAddressToRoute(res: IOrderShow[], res2: IDelivery[]) {
  var temp = res;
  var temp2 = res2;

  temp2.forEach(
    (item: {
      id: number;
      orderId: number;
      deliveryDate: any;
      deliveryStatusName: any;
      deliveryAgentName: any;
      requiredDelete?:boolean
    }) => {
      var element = temp.find((item2) => item.orderId == item2.id);
      var tempx =this.storedRequires;
      var deleteEl:boolean= tempx.includes(item.orderId)
      if (element) {
        var sender = element.senderInfo?.indexOf('District')!;
        var sender2 = element.senderInfo?.indexOf('PhoneNumber')!;
        var address1 = '';
        var sendAddress2 = '';
        if (sender == null) {
          address1 = 'Unknown';
        } else {
          address1 = element.senderInfo?.substring(sender + 9)!;
          sendAddress2 = element.senderInfo?.substring(
            sender + 9,
            sender2 - 7
          )!;
        }
        var address2 = '';
        var sendAddress3 = '';
        var contact = element.contactAddress.indexOf('District')!;
        var contact2 = element.contactAddress?.indexOf('PhoneNumber')!;
        if (contact == null) {
          address2 = 'Unknown';
        } else {
          address2 = element.contactAddress.substring(contact + 9)!;
          sendAddress3 = element.contactAddress?.substring(
            contact + 9,
            contact2 - 7
          )!;
        }
        console.log('send2 la: ', sendAddress2, '-', sendAddress3);
        var addressNew = sendAddress2 + '- ' + sendAddress3;
        if (addressNew.length < 11) {
          addressNew = 'Not Update';
        }
        
        var newDeliveries: IDelivering = {
          id: item.id,
          orderId: item.orderId,
          deliveryDate: item.deliveryDate,
          deliveryStatusName: item.deliveryStatusName,
          deliveryAgentName: item.deliveryAgentName,
          route: addressNew,
          delete:deleteEl
          
        };
        console.log(newDeliveries);

        this.items.push(newDeliveries);
      }
    }
  );
}
result=false;
confirmDialog(orderId:number): void {
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
        next:(res)=>{console.log("Cancel complete");this.router.navigateByUrl("/employee")},
        error:(err)=>{console.log(err)}
      })
    }
  });
}
}

