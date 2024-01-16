import { Injectable } from '@angular/core';
import { IOrderShow, IPayment, IReturnParcel } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { env } from 'src/app/config/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  orderShow:IOrderShow=({ id:0,
    contactAddress:'',
    service:'',
    customerId:'',
    prePaid:0,
    orderDate:new Date(),
    orderStatus:'',
    orderPaymentId:0});
    arrayParcels:IReturnParcel[]=[];
    parcel:IReturnParcel=({
      id:0,
      parcelName:'',
      weight:0,
      imageUrl:''
    });
    payment:IPayment=({
      id:0,
    subTotal:0,
    prePaid:0,
    servicePrice:0,
    distanceCharges:0,
    totalCharges:0,
    orderPaymentStatus:''
    })
  constructor(private deliveryService:DeliveryService,private http:HttpClient) { }

  fetchOrder(customerId:any,orderId:any){
    this.deliveryService.checkout(customerId,orderId).subscribe({
      next:(res)=>{this.orderShow=res;this.convertDataToString()},
      error:(err)=>{console.log(err)}
    })
    this.deliveryService.parcelInfo(orderId).subscribe({
      next:(res)=>{console.log(res); this.arrayParcels=res;this.saveParcelsInfo()},
      error:(err)=>{console.log(err)}
    })
    this.deliveryService.paymentInfo(orderId).subscribe({
      next:(res)=>{console.log(res); this.payment=res;this.savePaymentInfo()},
      error:(err)=>{console.log(err)}
    })
  }
  createNewDelivery(submitDelivery:any){
    return this.http.post<any>(env+'/Delivery/delivery',submitDelivery)
  }
  convertDataToString(){
   var jsonString = JSON.stringify(this.orderShow);
   localStorage.setItem('orderShow',jsonString)
  }
  convertStringToData():any{
    var order = JSON.parse(localStorage.getItem('orderShow')!)
    console.log(order)
    return order
  }
  saveParcelsInfo(){
    var jsonString = JSON.stringify(this.arrayParcels)
    localStorage.setItem('arrayParcels',jsonString)
  }
  convertStringToArray():any{
    var array = JSON.parse(localStorage.getItem('arrayParcels')!)
    console.log(array)
    return array
  }
  savePaymentInfo(){
    var jsonString = JSON.stringify(this.payment)
    localStorage.setItem('payment',jsonString)
  }
  convertPaymentStringInfoToObj():any{
    var payment= JSON.parse(localStorage.getItem('payment')!)
    console.log(payment)
    return payment
  }

}
