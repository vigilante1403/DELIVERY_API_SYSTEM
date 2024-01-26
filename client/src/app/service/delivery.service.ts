import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDelivery, IOrderShow, IPayment, IReturnPayInfoParcel, IService, ISubmitListParcel, ISubmitOrder } from '../interface/delivery/IDelivery';
import { env } from '../config/environment';
import { ICustomer } from '../interface/account/IUser'

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  services:IService[]=[]
  customer:ICustomer=({id:'',name:'',email:'',phoneNumber:''})
  ordersToShow:IOrderShow[]=[]
  constructor(private http:HttpClient) { }

  fetchAllDeliveryType():Observable<IService[]>{
      return this.http.get<IService[]>(env+'/Service/all')
  }
  getCustomerInfo(email:any):Observable<ICustomer>{
    return this.http.get<ICustomer>(env+'/Authorize/profile/1/'+email)
  }
  addNewOrder(order:any){
    return this.http.post<ISubmitOrder>(env+'/Order/order',order)
  }
  getCustomerOrderHistories(customerId:any):Observable<IOrderShow[]>{
   
    return this.http.get<IOrderShow[]>(env+'/Order/order/1/'+customerId)
  }
  addPackageToOrder(submitList:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
    return this.http.post<any>(env+'/Order/parcel',submitList)
  }
  checkout(customerId:any,orderId:any){
      return this.http.get<IOrderShow>(env+'/Order/order/'+customerId+'/'+orderId)
  }//address
  parcelInfo(orderId:any){
    return this.http.get<any>(env+'/Order/parcel/'+orderId)
  }//parcel
  paymentInfo(orderId:any){
    return this.http.get<IPayment>(env+'/Payment/order-payment/'+orderId)
  }///payment
  getLatestOrder(customerId:any){
    return this.http.get<IOrderShow>(env+'/Order/order/'+customerId)
  }
  fetchAllDeliveriesOfSpecificCustomer(customerId:any){
    return this.http.get<IDelivery[]>(env+'/Delivery/delivery-created/'+customerId)
  }
  fetchAllUnFinishedOrders(customerId:any){
    return this.http.get<IOrderShow[]>(env+'/Delivery/temp/'+customerId)
  }
  updateStatusDeliveries(customerId:any){
    return this.http.get(env+'/Delivery/update-delivery-status/'+customerId)

  }
  fetchAllDetailsRequired(arrayOrderIds:any){
    return this.http.post<any>(env+'/Order/required-list',arrayOrderIds)
  }
  fetchAllPayments(customerId:any){
    return this.http.get<IReturnPayInfoParcel[]>(env+'/Payment/order-payments/'+customerId)
  }
  fetchEditData(orderId:any){
    return this.http.get<IReturnPayInfoParcel>(env+"/Order/edit/order-and-other-forms/"+orderId)
  }
  editUnfinishedOrder(data:any) {
    // Create a FormData object to send the form data
    
    // Make the POST request
    return this.http.post<any>(env+'/Order/edit/order-and-other-forms', data);
  }
}
