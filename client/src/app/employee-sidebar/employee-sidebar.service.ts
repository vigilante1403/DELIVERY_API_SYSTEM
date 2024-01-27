import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSidebarService {

  constructor() { }
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Manage',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Edit Users Orders',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          },
          url:'/employee'
          
        },
        {
          title: 'Orders Notifications',
          url:''
        },
        
        
      ]
    },
    {
      title: 'Services',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      badge: {
        text: '',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Delivering',
          badge: {
            text: '',
            class: 'badge-success'
          },
          url:'/employee/delivering'
          
        },
        
        
      ]
    }
    ,
    {
      title: 'Account',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      badge: {
        text: 'New ',
        class: 'badge-warning'
      },
      submenus: [
        {
          title: 'Edit Profile',
          badge: {
            text: '',
            class: 'badge-success'
          },
          url:'/employee/edit-profile'
          
        },
        {
          title: 'Your profile',
          badge: {
            text: '',
            class: 'badge-success'
          },
          url:'/employee/profile'
          
        },
        
        
      ]
    },

   
  ];
choose:string="Users Management"
ChooseEvent(table:string){
  this.choose=table
  console.log("switching table")
}
  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }
  getTable(){
    return this.choose
  }
  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
