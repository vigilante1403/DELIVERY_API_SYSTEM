import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../config/environment';

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
}
