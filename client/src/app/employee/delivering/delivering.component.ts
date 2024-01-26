import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivering, IDelivery } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-delivering',
  templateUrl: './delivering.component.html',
  styleUrls: ['./delivering.component.scss']
})
export class DeliveringComponent implements OnInit{
  items!:IDelivering[]
  deliveries!:IDelivery[]
  
  modalRef?: BsModalRef;
  orderId:number=0
constructor(private modalService: BsModalService,private service:DeliveryService) {
  this.service.updateAllDeliveries().subscribe({
    next:(res)=>{console.log(res)},
    error:(err)=>{console.log(err)}
  })
 
 
}
ngOnInit(): void {
  this.service.fetchAllOutGoingDeliveries().subscribe({
    next:(res)=>{console.log(res);this.deliveries=res},
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
}
