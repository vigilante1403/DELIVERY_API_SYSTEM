import { IToken } from './../../interface/Password/IToken';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { env } from 'src/app/config/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  emailForm!: FormGroup;
  emailSend: string='';
  emailFind: string ='';
  isFindByEmail = true;
  isFindByPhone = false;
  urlNav: any[] = ["user/verify"]
  isVerify=false
  b : IToken={token:'aaaa'}
  constructor(private http : HttpClient,private fb: FormBuilder,private router: Router){}

  ngOnInit(): void {
      this.emailForm = this.fb.group({
        email:["", Validators.required]
      });
  }
  changeNumber(){
    this.isFindByEmail = !this.isFindByEmail;
    this.isFindByPhone = !this.isFindByPhone;
  }
 

  onSubmit() {
  //   const newMail=  this.emailForm.get('email')?.value;
  //  console.log(newMail);
   let params = new HttpParams();
   if(this.emailForm.value !== '')
   {
    params=params.append('email', this.emailForm.get('email')?.value);
   }
   console.log(params);
   console.log("lo");
   
   console.log(this.emailForm.get('email')?.value);
   
    this.http.get(env+ "/account/3/r/forgot-password/findemail", {params}).subscribe({
      next: (e) => {console.log(e);
        // this.router.navigate(["user/verify", {email:  this.emailForm.get('email')?.value}]);  
        this.emailFind=  this.emailForm.get('email')?.value; 
       this.isVerify=true;
       this.isFindByEmail=false;
       this.isFindByPhone=false;
       this.emailSend = this.emailForm.get('email')?.value;
      },
      error: (err) => {console.log(err);
      }
    })
   
  }
  onSubmit2() {
    let params = new HttpParams();
    // this.emailSend = this.emailForm.get('email')?.value;
    if(this.emailSend){
      params = params.append('userEmail', this.emailSend);
    }
  
    this.http.get(env + '/account/forgot-generate-otp', {params}).subscribe({
      next: (res) => {console.log(res);
        
        this.isVerify=false
      },
      error: (err) => {console.log(err);
      }
    })
  }

}
