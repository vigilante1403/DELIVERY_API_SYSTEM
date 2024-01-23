import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ModalService } from '../nav-bar/modal/modal.service';
import { faLaptop,faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { EmployeeSidebarService } from './employee-sidebar.service';

@Component({
  selector: 'app-employee-sidebar',
  templateUrl: './employee-sidebar.component.html',
  styleUrls: ['./employee-sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class EmployeeSidebarComponent {
  menus:any = [];
  faLaptop=faLaptop
  faBookOpen=faBookOpen
  login!:boolean
  constructor(public sidebarservice: EmployeeSidebarService,public service:ModalService) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
    this.service.checkLogin().subscribe(value=>this.login=value)
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
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
