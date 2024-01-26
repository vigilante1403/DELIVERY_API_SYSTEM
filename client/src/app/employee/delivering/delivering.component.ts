import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivering } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-delivering',
  templateUrl: './delivering.component.html',
  styleUrls: ['./delivering.component.scss']
})
export class DeliveringComponent implements OnInit{
  items!:IDelivering[]
  
  modalRef?: BsModalRef;

constructor(private modalService: BsModalService) {
 
}
ngOnInit(): void {
    
}
openModal(template: TemplateRef<void>) {
  this.modalRef = this.modalService.show(template);
  
}
closeModal(data:any){
  this.modalRef?.hide()
}
}
