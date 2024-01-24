import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../config/environment';
import { ICountry, IDeliveryAgent, IDistrict, IPayment, IPaymentStatus, IWard } from '../interface/delivery/IDelivery';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiKey = 'YOUR_GOOGLE_API_KEY';
   google: any; 
  constructor(private http: HttpClient) {}

  getPlaceDetails(placeId: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${this.apiKey}`;

    return this.http.get(url);
}
createMap(mapDiv: HTMLElement, options: google.maps.MapOptions): google.maps.Map {
  return new google.maps.Map(mapDiv, options);
}
  createNewOrderPayment(orderId:any,submitAddress:any){
    return this.http.post<any>(env+'/Payment/order-payment/'+orderId,submitAddress)
  }
  fetchAllDistricts(){
    return this.http.get<IDistrict[]>(env+'/Address/districts')
  }
  fetchAllWards(){
    return this.http.get<IWard[]>(env+'/Address/wards')
  }
  fetchAllCountries(){
    return this.http.get<ICountry[]>(env+'/Address/countries')
  }
  fetchAllExpress(){
    return this.http.get<IDeliveryAgent[]>(env+'/Delivery/delivery-agent')
  }
  fetchAllOrderPaymentStatus(){
    return this.http.get<IPaymentStatus[]>(env+'/Payment/order-payment-status')
  }
  fetchAllOrderPayments(){
    return this.http.get<IPayment[]>(env+'/Payment/order-payment/all')
  }
  updatePaidOrder(submit1:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(env+'/Order/edit/paid-orders',submit1)
  }
  updateDelivery(delivery1:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(env+'/Delivery/delivery-alter',delivery1)
  }
}
