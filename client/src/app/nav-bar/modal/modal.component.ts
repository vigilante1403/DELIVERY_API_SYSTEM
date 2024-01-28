import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from './modal.service';
import { BackgroundService } from 'src/app/background/background.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalRef?: BsModalRef;
  login!:boolean
  constructor(private modalService: BsModalService,public service:ModalService,private background:BackgroundService) {}
 
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  receiveFromChild(data:any){
    this.modalRef?.hide()
    this.startCheckDeliveries()
  }
  ngOnInit(): void {
      this.service.checkLogin().subscribe(value=>this.login=value)
  }
  startCheckDeliveries(){
    this.background.fetchCustomerTodayEvent(this.service.user.userId!);
  }
}

