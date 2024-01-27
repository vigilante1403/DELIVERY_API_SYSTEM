import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../service/delivery.service';
import { ModalService } from '../nav-bar/modal/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

constructor(private service:DeliveryService,public modal:ModalService){
console.log(modal.user);
}
ngOnInit(): void {
    this.service.getCustomerInfo(localStorage.getItem('userEmail'));
}
}
