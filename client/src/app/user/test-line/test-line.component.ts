import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDelivery } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-test-line',
  templateUrl: './test-line.component.html',
  styleUrls: ['./test-line.component.scss']
})
export class TestLineComponent implements OnInit {
 
  isCollapsed=true
  modalRef?: BsModalRef;

  @Input() currentStep!:number
  @Input() imageUrl?:string
  constructor(private modalService: BsModalService){
    
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
