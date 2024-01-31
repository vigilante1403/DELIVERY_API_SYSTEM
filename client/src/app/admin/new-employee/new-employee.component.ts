import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from '../../nav-bar/modal/modal.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ILogin, IRegister, IUser } from 'src/app/interface/account/IUser';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/config/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {
  loginData:ILogin=({email:'',password:''})
  registerData:IRegister=({email:'',password:'',displayName:''})

  constructor(public modalService:ModalService,private fb:FormBuilder,private http: HttpClient){

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
  SignUp(register:IRegister):Observable<IUser>{
    return this.http.post<IUser>(env+'/Account/register-employee',register)
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
        this.registerData=({displayName:this.getDisplayNameRegister()?.value,email:this.getEmailRegister()?.value,password:this.getPasswordRegister()?.value})
        console.log('form submitted')
        this.SignUp(this.registerData).subscribe({
          next:(res)=>{console.log(res);
            
           },
          error:(err)=>{console.log(err);this.modalService.loginStatus.next(false)}
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
