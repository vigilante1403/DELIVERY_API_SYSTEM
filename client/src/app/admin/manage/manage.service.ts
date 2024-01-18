import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/config/environment';
import { IOrderShow, IOrderStatus, IUser } from 'src/app/interface/delivery/IDelivery';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private http:HttpClient) { }
  getAllOrders(){
    return this.http.get<IOrderShow[]>(env+'/Admin/order-created')
  }
  getAllUsers(){
    return this.http.get<IUser[]>(env+'/Admin/users/all')
  }
  getAllOrderStatus(){
    return this.http.get<IOrderStatus[]>(env+'/Order/order-status')
  }
  addNewDistrict(district:any){
    return this.http.post<any>(env+'/Address/district',district)
  }
  addNewWard(ward:any){
    return this.http.post<any>(env+'/Address/ward',ward)
  }
}
