import { Component } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { DeliveryService } from '../service/delivery.service';
import { ISubmitCancelOrder } from '../interface/delivery/IDelivery';

@Component({
  selector: 'app-cancel-order-notif',
  templateUrl: './cancel-order-notif.component.html',
  styleUrls: ['./cancel-order-notif.component.scss']
})
export class CancelOrderNotifComponent {
  reason=""
constructor(private activatedRoute:ActivatedRoute,private service:DeliveryService,private router:Router){}
onChangeReason(event:Event){
const val = (event.target as HTMLInputElement).value
this.reason=val
console.log("ND la: ",val)
}
onSubmit(){
var id = this.activatedRoute.snapshot.paramMap.get('orderId')!
var orderId=Number(id)
const phoneRegex = /^-?\d+(\.\d+)?$/;
if(!phoneRegex.test(id)){
  console.log("Error");
  return;
}
var submit:ISubmitCancelOrder=({
  orderId:orderId,
  reason:this.reason
})
this.service.addCancelOrderNotif(submit).subscribe({
  next:(res)=>{console.log("add success");this.router.navigateByUrl("/user")},
  error:(err)=>{console.log(err)}
})

}
}
