import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalRef?: BsModalRef;
  login!:boolean
  constructor(private modalService: BsModalService,public service:ModalService) {}
 
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  receiveFromChild(data:any){
    this.modalRef?.hide()
  }
  ngOnInit(): void {
      this.service.checkLogin().subscribe(value=>this.login=value)
  }
}

