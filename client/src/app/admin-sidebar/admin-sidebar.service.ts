import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminSidebarService {

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
          title: 'Users Management',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          },
          url:'/admin/manage/all'
          
        },
        {
          title: 'Orders Management',
          url:'/admin/manage/all'
        },
        {
          title: 'Delivery Agents Management',
          url:'/admin/manage/all'
        },
        {
          title: 'Location Management',
          url:'/admin/manage/all'
        },
        {
          title: 'Order Payment Status Management',
          url:'/admin/manage/all'
        },
        {
          title: 'Order Status Management',
          url:'/admin/manage/all'
        },
        {
          title: 'Service Management',
          url:'/admin/manage/all'
        }
      ]
    },
    {
      title: 'Admin',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Make roles',
         
        },
        
      ]
    },
    {
      title: 'History',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Orders',
         
        },
        {
          title: 'Waiting payment orders'
        },
      
      ] 
    },
    // {
    //   title: 'Charts',
    //   icon: 'fa fa-chart-line',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Pie chart',
    //     },
    //     {
    //       title: 'Line chart'
    //     },
    //     {
    //       title: 'Bar chart'
    //     },
    //     {
    //       title: 'Histogram'
    //     }
    //   ]
    // },
    // {
    //   title: 'Maps',
    //   icon: 'fa fa-globe',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Google maps',
    //     },
    //     {
    //       title: 'Open street map'
    //     }
    //   ]
    // },
    // {
    //   title: 'Extra',
    //   type: 'header'
    // },
    // {
    //   title: 'Documentation',
    //   icon: 'fa fa-book',
    //   active: false,
    //   type: 'simple',
    //   badge: {
    //     text: 'Beta',
    //     class: 'badge-primary'
    //   },
    // },
    // {
    //   title: 'Calendar',
    //   icon: 'fa fa-calendar',
    //   active: false,
    //   type: 'simple'
    // },
    // {
    //   title: 'Examples',
    //   icon: 'fa fa-folder',
    //   active: false,
    //   type: 'simple'
    // }
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
