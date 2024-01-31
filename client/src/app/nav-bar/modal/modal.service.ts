import { Injectable, TemplateRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin, IRegister, IUser } from '../../interface/account/IUser';
import { env } from '../../config/environment';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  loginStatus:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(localStorage.getItem('access_token')!=null)
  login$:Observable<boolean>=this.loginStatus.asObservable();
  modalRef?: BsModalRef;
  user:IUser=({displayName:localStorage.getItem('userName')!=null?localStorage.getItem('userName')!:'',
  email:localStorage.getItem('userEmail')!=null?localStorage.getItem('userEmail')!:'',token:localStorage.getItem('access_token')!=null?
localStorage.getItem('access_token')!:'',imageUrl:localStorage.getItem('imageUrl')!=null?
localStorage.getItem('imageUrl')!:'',userId:localStorage.getItem('userId')!=null?
localStorage.getItem('userId')!:'',role:localStorage.getItem('role')!=null?
localStorage.getItem('role')!:'',totalDeliveriesMade:localStorage.getItem('totalDeliveriesMade')!=null?
localStorage.getItem('totalDeliveriesMade')!:'0',phoneNumber:localStorage.getItem('phoneNumber')!=null?
localStorage.getItem('phoneNumber')!:'undefined'});
  constructor(private http:HttpClient,private router:Router) { } // inject modal service
  SignIn(login:ILogin):Observable<IUser>{
   return this.http.post<IUser>(env+'/Account/login',login)
  }
  SignUp(register:IRegister):Observable<IUser>{
    return this.http.post<IUser>(env+'/Account/register',register)
  }
  Logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    localStorage.removeItem('imageUrl');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('totalDeliveriesMade');
    localStorage.removeItem('phoneNumber');
    this.loginStatus.next(false)
    this.user=({displayName:'',email:'',token:'',imageUrl:'',userId:'',role:'',totalDeliveriesMade:'0',phoneNumber:'undefined'})
   if(!this.router.url.startsWith("/forgot-password")&&!this.router.url.startsWith("/1/reset/")){
    this.router.navigateByUrl("/")
   }
   
  }
  checkLogin(){
    return this.login$;
  }
  




  // create and show modal with given component
  
}