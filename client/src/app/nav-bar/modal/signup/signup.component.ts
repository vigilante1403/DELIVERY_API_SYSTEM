import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ILogin, IRegister, IUser } from 'src/app/interface/account/IUser';
import { Output } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginData:ILogin=({email:'',password:''})
  registerData:IRegister=({email:'',password:'',displayName:''})
  @Output() dataToParent  = new EventEmitter<boolean>
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
  error:string=''
  requiredField:string=''
  requiredField2:string='';
  closeForm:boolean=false;
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

      if(!this.login.valid){
        this.requiredField2='You need to fill this field'
        console.log('login failed')
        this.closeForm=false;
        this.modalService.loginStatus.next(false)
      }else{
        this.requiredField2=''
        this.loginData=({email:this.getEmailLogin()?.value,password:this.getPasswordLogin()?.value})
        console.log('form submitted')
        this.modalService.SignIn(this.loginData).subscribe({
          next:(res)=>{this.modalService.user=res;console.log(res);localStorage.setItem('access_token',res.token);
        localStorage.setItem('userEmail',res.email);localStorage.setItem('userName',res.displayName);localStorage.setItem('imageUrl', res.imageUrl);this.closeForm=true
      ;this.sendData();
    this.modalService.loginStatus.next(true)},
          error:(err)=>{console.log(err);this.modalService.loginStatus.next(false)}
        });
      }
     
      
    
  }
  registerSubmit(){
    if(!this.tickRegister){
      this.error='You have to accept with our terms';
      if(!this.register.valid){
        this.requiredField='You need to fill this field'
      }else{
        this.requiredField=''
      }
      this.closeForm=false;
      this.modalService.loginStatus.next(false)
      return;
    }else{
      this.error=''
      if(this.register.valid){
        this.requiredField=''
        this.registerData=({displayName:this.getDisplayNameRegister()?.value,email:this.getEmailRegister()?.value,password:this.getPasswordRegister()?.value})
        console.log('form submitted')
        this.modalService.SignUp(this.registerData).subscribe({
          next:(res)=>{this.modalService.user=res;console.log(res);
            localStorage.setItem('access_token',res.token);
            localStorage.setItem('userEmail',res.email);localStorage.setItem('userName',res.displayName);this.closeForm=true;this.sendData();this.modalService.loginStatus.next(true)},
          error:(err)=>{console.log(err);this.modalService.loginStatus.next(false)}
        })
      }else{
        this.requiredField='You need to fill this field'
        this.closeForm=false;
        this.modalService.loginStatus.next(false)
        console.log('form invalid')
      }
    }
    
  }
  tick(){
    this.tickRegister=!this.tickRegister;
    if(this.tickRegister){
      this.error=''
    }
  }
  sendData(){
    this.dataToParent.emit(this.closeForm)
  }
  currentTab='login';
  switchTab(tab:any){
    this.currentTab=tab
    
  }
}
