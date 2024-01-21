import { Component } from '@angular/core';
import { ModalService } from './nav-bar/modal/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SidebarService } from './sidebar/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService:ModalService,public sidebarservice:SidebarService,private router:Router){}
  title = 'client';

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
