import { Component } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { IOrderShow, IPayment, IReturnParcel } from 'src/app/interface/delivery/IDelivery';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
 public orderShow:IOrderShow=({ id:0,
    contactAddress:'',
    service:'',
    customerId:'',
    prePaid:0,
    orderDate:new Date(),
    orderStatus:'',
    orderPaymentId:0,
  pricePerDistanceId:0})
    contactAddress:string=''
    arrayParcels:IReturnParcel[]=[];
    payment:IPayment=({
      id:0,
    subTotal:0,
    prePaid:0,
    servicePrice:0,
    distanceCharges:0,
    totalCharges:0,
    orderPaymentStatus:''
    })
    public showSuccess: boolean = false;
    public showCancel: boolean = false;
    public showError: boolean = false;
    public payPalConfig?: IPayPalConfig;
  constructor(public service:CheckoutService,public routeActivate:ActivatedRoute){

  }
  ngOnInit(){
    
    this.orderShow=this.service.convertStringToData()
    this.ConvertContactData(this.orderShow.contactAddress)
    this.arrayParcels=this.service.convertStringToArray()
    this.payment=this.service.convertPaymentStringInfoToObj()
    this.initConfig(this.payment.totalCharges.toString());
  }
  ConvertContactData(contactAddress:any){
    var json = JSON.parse(contactAddress);
    var name = json["FullName"]
    var address= json["Address"]
    var phone = json["PhoneNumber"]
    this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
  }
  private initConfig(totalAmount:any): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalAmount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: totalAmount
              }
            }
          },
          items: [
            {
              name: 'Shipping Delivery',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value:totalAmount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        var submitDelivery=({orderId:Number(this.routeActivate.snapshot.paramMap.get('orderId'))})
          this.service.createNewDelivery(submitDelivery).subscribe({
            next:(res)=>{console.log(res)},
            error:(err)=>{console.log(err)}
          })
      })
  
     ;
        
        
  
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
