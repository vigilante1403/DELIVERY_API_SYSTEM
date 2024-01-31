import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminSidebarService } from './admin-sidebar.service';
import { ModalService } from '../nav-bar/modal/modal.service';
import { faLaptop,faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class AdminSidebarComponent {
  menus:any = [];
  faLaptop=faLaptop
  faBookOpen=faBookOpen
  login!:boolean
  constructor(public sidebarservice: AdminSidebarService,public service:ModalService) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
    this.service.checkLogin().subscribe(value=>this.login=value)
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
logout(){
  this.service.Logout()
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
