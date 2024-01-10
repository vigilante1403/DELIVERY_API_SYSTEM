import { Injectable, TemplateRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin, IRegister, IUser } from '../../interface/Account/IUser';
import { env } from '../../config/environment';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef?: BsModalRef;
  constructor(private http:HttpClient,) { } // inject modal service
  SignIn(login:ILogin):Observable<IUser>{
   return this.http.post<IUser>(env+'/Account/login',login)
  }
  SignUp(register:IRegister):Observable<IUser>{
    return this.http.post<IUser>(env+'/Account/register',register)
  }




  // create and show modal with given component
  
}