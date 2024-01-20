import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOrderShow } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-temp-table',
  templateUrl: './temp-table.component.html',
  styleUrls: ['./temp-table.component.scss']
})
export class TempTableComponent {
@Input() data!:IOrderShow[]
modalRef?: BsModalRef;
items1: number[];
constructor(private modalService: BsModalService) {
  this.items1 = Array(15).fill(0);
}

openModal(template: TemplateRef<void>) {
  this.modalRef = this.modalService.show(template);
}
}
