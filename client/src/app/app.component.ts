import { Component, OnInit } from '@angular/core';
import { ModalService } from './nav-bar/modal/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SidebarService } from './sidebar/sidebar.service';
import { Router } from '@angular/router';
import { PeriodService } from './period/period.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private modalService:ModalService,public sidebarservice:SidebarService,private router:Router,private dataService:PeriodService){
    
  }
  title = 'client';
  

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }
  isAdminRoute():boolean{
    return this.router.url.startsWith('/admin')
  }
  isEmployeeRoute():boolean{
    return this.router.url.startsWith('/employee')
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
  

  

  ngOnInit(): void {
    
}
   // 2 minutes
}
