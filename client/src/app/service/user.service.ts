import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../config/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  verifyEmail(data:any){
    
    return this.http.get(env+ "/account/3/r/forgot-password/findemail/"+data)
  }
  sendOtp(data:any){
    return this.http.get(env + '/account/forgot-generate-otp', {params:data})
  }
}
