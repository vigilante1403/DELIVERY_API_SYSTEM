import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDelivery, IDeliveryStatus, IOrderShow, IPayment, IReturnPayInfoParcel, IService, ISubmitCancelOrder, ISubmitChangeLocation, ISubmitListParcel, ISubmitOrder } from '../interface/delivery/IDelivery';
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
  fetchAllDeliveries(){
    return this.http.get<IDelivery[]>(env+'/Admin/delivery-created')
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
  updateAllDeliveries(){
    return this.http.get(env+'/Delivery/update-status-all')
  }
  fetchAllOutGoingDeliveries(){
    return this.http.get<IDelivery[]>(env+'/Delivery/out-going-delivery')
  }
  fetchAllReachedDeliveries(){
    return this.http.get<IDelivery[]>(env+'/Delivery/reached-delivery')
  }
  updateLocation(data:ISubmitChangeLocation){
    return this.http.put<ISubmitChangeLocation>(env+'/Delivery/update-location',data)
  }
  fetchAllDeliveryStatus(){
    return this.http.get<IDeliveryStatus[]>(env+'/Order/order-status')
  }
  fetchAllPaymentStatus(){
    return this.http.get<IDeliveryStatus[]>(env+'/Payment/order-payment-status')
  }
  cancelOrderAndItPayment(orderId:number){
    return this.http.post<any>(env+'/Payment/order-payment/cancel',orderId)
  }
  cancelPaidOrderNotPickUpYet(orderId:number){
    return this.http.post<any>(env+'/Payment/paid-orders/cancel',orderId)
  }
  updateReceiveImage(form:any){
    return this.http.post<any>(env+'/Delivery/update-receive-image',form)
  }
  addCancelOrderNotif(data:ISubmitCancelOrder){
    return this.http.post<any>(env+'/Order/add-cancel-order-notif',data)
  }
  getAllCancel(){
    return this.http.get<any>(env+'/Order/get-all-require-cancel')
  }
  sendEmail(orderId:any){
    return this.http.get(env+'/Order/send-email-order/'+orderId)
  }
}
