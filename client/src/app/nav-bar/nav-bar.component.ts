import { Component, ViewChild } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { LoginComponent } from './modal/login/login.component';
import { ModalComponent } from './modal/modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(public bs:BsModalService,public modalService:ModalService) { } // inject modal service

  ngOnInit(): void {
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

  
  @ViewChild('myModal')
  myModal?: ModalComponent;

  isLogin = true; // Default to login

  toggleModal() {
    this.isLogin = !this.isLogin;
  }

}

