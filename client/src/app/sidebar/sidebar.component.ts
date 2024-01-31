import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { ModalService } from '../nav-bar/modal/modal.service';
import { faCode,faTree } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus:any = [];
  faTree=faTree
  faCode=faCode
  login!:boolean
  constructor(public sidebarservice: SidebarService,public service:ModalService,private router:Router) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
    this.service.checkLogin().subscribe(value=>this.login=value)
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  logout(){
    this.service.Logout();
    
  }
  toggle(currentMenu:any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element:any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}