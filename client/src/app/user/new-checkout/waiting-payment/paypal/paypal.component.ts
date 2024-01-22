import { Component, Input, OnInit, Output } from '@angular/core';
import { CheckoutService } from 'src/app/user/checkout/checkout.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public payPalConfig?: IPayPalConfig;
  @Input() orderId!:number
  @Input() totalAmount!:number
constructor(private service:CheckoutService,private router:Router,private toastr:ToastrService){

}
ngOnInit(): void {
    this.initConfig(this.totalAmount.toString());
    console.log("total amount ",this.totalAmount)
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
      var submitDelivery=({orderId:this.orderId})
        this.service.createNewDelivery(submitDelivery).subscribe({
          next:(res)=>{console.log(res);this.router.navigateByUrl("/user/checkout")},
          error:(err)=>{console.log(err)}
        })
    })

   ;
      
      

  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
    this.dataToParent()
    this.toastr.success("Pay successfully","Payment")
    this.router.navigateByUrl("/user/new-cart")
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
@Output() data = new EventEmitter<string>
dataToParent(){
  // this.data.emit("close Form");
}
}
