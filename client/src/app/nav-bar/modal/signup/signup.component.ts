import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ILogin, IRegister, IUser } from 'src/app/interface/Account/IUser';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginData:ILogin=({email:'',password:''})
  registerData:IRegister=({email:'',password:'',displayName:''})
  constructor(public modalService:ModalService,private fb:FormBuilder){

  }
  //register
  tickRegister:boolean=false;
  email:FormControl= new FormControl('',[Validators.email,Validators.required])
  displayName:FormControl = new FormControl('',Validators.required)
  password:FormControl = new FormControl('',Validators.required)
  register!:FormGroup
  //login
  login!:FormGroup;
  emailLogin:FormControl= new FormControl('',[Validators.email,Validators.required])
  passwordLogin:FormControl = new FormControl('',Validators.required)

  initFormGroup(){
    this.register= this.fb.group({
      emailRegister:this.email,
      passwordRegister:this.password,
      displayNameRegister:this.displayName
    })
    this.login=this.fb.group({
      emailLogin:this.emailLogin,
      passwordLogin:this.passwordLogin
    })
  }
  getEmailLogin(){
    return this.login.get('emailLogin')
  }
  getPasswordLogin(){
    return this.login.get('passwordLogin')
  }
  getEmailRegister(){
    return this.register.get('emailRegister')
  }
  getPasswordRegister(){
    return this.register.get('passwordRegister')
  }
  getDisplayNameRegister(){
    return this.register.get('displayNameRegister')
  }
  ngOnInit(): void {
      this.initFormGroup();
  }
  
  loginSubmit(){

  }
  registerSubmit(){
    if(!this.tickRegister){
      
    }
  }

}
