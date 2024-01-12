import { Component } from '@angular/core';
import { DeliveryService } from '../service/delivery.service';
import { ModalService } from '../nav-bar/modal/modal.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(public service:ModalService){

  }

}
