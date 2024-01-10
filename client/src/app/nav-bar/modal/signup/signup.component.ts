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
      }else{
        this.requiredField2=''
        this.loginData=({email:this.getEmailLogin()?.value,password:this.getPasswordLogin()?.value})
        console.log('form submitted')
        this.modalService.SignIn(this.loginData).subscribe({
          next:(res)=>{this.modalService.user=res;console.log(res)},
          error:(err)=>{console.log(err)}
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
      return;
    }else{
      this.error=''
      if(this.register.valid){
        this.requiredField=''
        this.registerData=({email:this.getEmailRegister()?.value,password:this.getPasswordRegister()?.value,displayName:this.getDisplayNameRegister()?.value})
        console.log('form submitted')
        this.modalService.SignUp(this.registerData).subscribe({
          next:(res)=>{this.modalService.user=res},
          error:(err)=>console.log(err)
        })
      }else{
        this.requiredField='You need to fill this field'
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

}
