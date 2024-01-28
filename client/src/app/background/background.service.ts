import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDelivery } from '../interface/delivery/IDelivery';
import { env } from '../config/environment';
import { NotifierService } from 'angular-notifier';
import { ModalService } from '../nav-bar/modal/modal.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  userEvent:IDelivery[]=localStorage.getItem('userTodayEvent')!=null?JSON.parse(localStorage.getItem('userTodayEvent')!):[]
  private  readonly _notifier
  constructor(private datepipe:DatePipe,private http:HttpClient,private notifier:NotifierService,private modal:ModalService) { 
    this._notifier=notifier
  }
  fetchCustomerTodayEvent(customerId:string){
    return this.http.get<IDelivery[]>(env+'/Delivery/fetch-customer-deliveries/'+customerId).subscribe({
      next:(res)=>{console.log(res);if(res!=null){
        localStorage.setItem('userTodayEvent',JSON.stringify(res));
        this.userEvent=res;
        setInterval(()=>{
          if(this.modal.user.token!=''){
            console.log("Running background")
            this.makeNotif(this.datepipe.transform(new Date(),'yyyy-MM-dd HH:mm')!)
          }else{
            return;
          }
        },300000)
      }else{
        console.log("Empty delivery check")
      }},
      error:(err)=>{console.log(err)}
    })
  }
  makeNotif(formattedDate:string){
    var temp = this.userEvent;
    temp.forEach(el=>{
      var pickUp = new Date(el.pickUpDateTime)
      var deliver = new Date(el.deliveryDate)
      var current = new Date()
      if(pickUp.getTime()-current.getTime()<=600000&&current.getTime()!=pickUp.getTime()&&(pickUp.getTime()-current.getTime()>0)){
        var msg ='Your delivery agent will arrive soon to pick up your order at '+el.pickUpDateTime+'; OrderId: '
+el.orderId
        this.notifier.show({
          type: 'warning',
          message: msg,
        });
      }else if(formattedDate==this.datepipe.transform(pickUp,'yyyy-MM-dd HH:mm')!){
        var msg ='Your order is now picked up; OrderId: '
+el.orderId
        this.notifier.show({
          type: 'success',
          message: msg,
        });
      }else if(deliver.getTime()-current.getTime()<=600000&&current.getTime()!=deliver.getTime()&&(deliver.getTime()-current.getTime()>0)){
        var msg ='Your recipient will receive package soon at '+el.deliveryDate+'; OrderId: '
+el.orderId
        this.notifier.show({
          type: 'warning',
          message: msg,
        });
      }else if(formattedDate==this.datepipe.transform(deliver,'yyyy-MM-dd HH:mm')!){
        var msg ='The package reached your recipient at '+el.deliveryDate+'; OrderId: '
+el.orderId
        this.notifier.show({
          type: 'success',
          message: msg,
        });
      }
      
    })
  }

}
