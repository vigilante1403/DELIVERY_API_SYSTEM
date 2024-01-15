import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent {
  
  constructor(public router: Router) {
    
  }
  items = [
    {
      title: 'Forms',
      content: [
        {
          name: 'Calculate Charges Form',
          link: 'forms/calculatecharges',
          i:false
        },
        {
          name: 'Customer Form',
          link: 'forms/customer',
          i:false
        },
        {
          name: 'Deliveries Form',
          link: 'forms/deliveries',
          i:false
        },
        {
          name: 'Delivery Agent Form',
          link: 'forms/deliveryAgent',
          i:false
        },
        {
          name: 'Delivery Service Form',
          link: 'forms/deliveryService',
          i:false
        },
        {
          name: 'Delivery Status Form',
          link: 'forms/deliveryStatus',
          i:false
        },
        {
          name: 'Order Detail Form',
          link: 'forms/orderDetail',
          i:false
        },
        {
          name: 'Order Payment Form',
          link: 'forms/orderPayMent',
          i:false
        },
        {
          name: 'Order Payment Status Form',
          link: 'forms/orderPaymentStatus',
          i:false
        },
        {
          name: 'Orders Form',
          link: 'forms/orders',
          i:false
        },
        {
          name: 'Orders Status Form',
          link: 'forms/ordersStatus',
          i:false
        },
        {
          name: 'Parcel',
          link: 'forms/parcel',
          i:false
        },
      ],
      show: true,
      h: false,
    },
    {
      title: 'Orders',
      content: [{ name: 'Order ', link: 'orders',
      i:false }],
      show: true,
      h: false,
      
    },
    {
      title: 'Menu',
      content: [{ name: 'Menu ', link: '',
      i:false }],
      show: true,
      h: false,
      
    },
    {
      title: 'Account',
      content: [{ name: 'Account', link: '',
      i:false }],
      show: true,
      h: false,
      
    },
    {
      title: 'Setting',
      content: [{ name: 'Setting', link: '',
      i:false }],
      show: true,
      h: false,
      
    },
    {
      title: 'List',
      content: [{ name: '', link: '',
      i:false }],
      show: true,
      h: false,
      
    },
  ];
   
   
  faArrowDown = faArrowDown;
  faChevronDown = faChevronDown;
 

}
