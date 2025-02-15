import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { LoginComponent } from './modal/login/login.component';
import { ModalComponent } from './modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryService } from '../service/delivery.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  private readonly _notif;
  constructor(public bs:BsModalService,public modalService:ModalService,public service:DeliveryService,public notif:NotifierService) { 
    this._notif=notif;
  } // inject modal service
  customerId:string=''
  ngOnInit(): void {
    if(localStorage.getItem('userEmail')!=null){
      this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
        next:(res)=>{this.service.customer=res;this.customerId=res.id},
        error:(err)=>console.log(err)
      })
    }
    
  }


  // -------button dropdown------- 
  // bsDropdownToggle() {
  //   // Kích hoạt menu dropdown
    
  //   const dropdown = document.querySelector('.dropdown-menu');
  //   if (!dropdown?.classList.contains("show")) {
  //     // Hiển thị menu xổ xuống
  //     dropdown?.classList.add("show");
  //   } else {
  //     // Ẩn menu xổ xuống
  //     dropdown.classList.remove("show");
  //   }
  // }

  checkAlert(){
    if(this.modalService.user.userId==""){
      this._notif.show({
        type: 'warning',
        message: "You need to login first",
      })
    }
  }
  @ViewChild('myModal')
  myModal?: ModalComponent;

  isLogin = true; // Default to login

  toggleModal() {
    this.isLogin = !this.isLogin;
  }

}

