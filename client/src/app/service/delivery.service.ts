import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderShow, IService, ISubmitListParcel, ISubmitOrder } from '../interface/delivery/IDelivery';
import { env } from '../config/environment';
import { ICustomer } from '../interface/account/IUser';

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
}
