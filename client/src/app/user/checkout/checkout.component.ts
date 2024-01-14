import { Component } from '@angular/core';
import { CheckoutService } from './checkout.service';
import { IOrderShow, IPayment, IReturnParcel } from 'src/app/interface/delivery/IDelivery';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
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
    orderPaymentId:0})
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
  constructor(public service:CheckoutService){

  }
  ngOnInit(){
    this.orderShow=this.service.convertStringToData()
    this.ConvertContactData(this.orderShow.contactAddress)
    this.arrayParcels=this.service.convertStringToArray()
    this.payment=this.service.convertPaymentStringInfoToObj()
    this.initConfig();
  }
  ConvertContactData(contactAddress:any){
    var json = JSON.parse(contactAddress);
    var name = json["name"]
    var address= json["address"]
    var phone = json["phoneNumber"]
    this.contactAddress = name+', Address: '+address+', PhoneNumber: (+84)'+phone
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value:'9.99',
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
