import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivering, IDelivery, IOrderShow } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.scss']
})
export class DeliveredComponent {
  items:IDelivering[]=[]
  deliveries:IDelivery[]=[]
  
  modalRef?: BsModalRef;
  orderId:number=0
constructor(private modalService: BsModalService,private service:DeliveryService) {
  this.service.updateAllDeliveries().subscribe({
    next:(res)=>{console.log(res)},
    error:(err)=>{console.log(err)}
  })
 
 
}
ngOnInit(): void {
  this.service.fetchAllReachedDeliveries().subscribe({
    next:(res)=>{console.log(res);this.deliveries=res; localStorage.setItem('deliveries',JSON.stringify(res));
    this.splitAddressToRoute(
      JSON.parse(localStorage.getItem('storedOrders')!),
      res
    );},
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
      receiveImage?:string;
      
    }) => {
      var element = temp.find((item2) => item.orderId == item2.id);

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
          receiveImage:item.receiveImage
        };
        console.log(newDeliveries);

        this.items.push(newDeliveries);
      }
    }
  );
}
}
