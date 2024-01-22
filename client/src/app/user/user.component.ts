import { Component, TemplateRef } from '@angular/core';
import { DeliveryService } from '../service/delivery.service';
import { ModalService } from '../nav-bar/modal/modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  modalRef?: BsModalRef;
  constructor(public service:ModalService,private bsModalService: BsModalService){

  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.bsModalService.show(template);
  }

}
