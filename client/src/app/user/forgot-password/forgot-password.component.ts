import { IToken } from './../../interface/Password/IToken';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { env } from 'src/app/config/environment';
import { UserService } from 'src/app/service/user.service';

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

  isVerify=false
 private readonly notifier: NotifierService
  constructor(private userService:UserService,private fb: FormBuilder,private router: Router,private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private _notifier: NotifierService){
    this.notifier=_notifier
  }

  ngOnInit(): void {
      this.emailForm = this.fb.group({
        email:["", Validators.required]
      });
  }
  changeNumber(){
    this.isFindByEmail = !this.isFindByEmail;
    this.isFindByPhone = !this.isFindByPhone;
  }
 

  onSubmit(event:Event) {

   
   console.log(this.emailForm.get('email')?.value);
   
    this.userService.verifyEmail(this.emailForm.get('email')?.value).subscribe({
      next: (e) => {console.log(e);

        this.emailFind=  this.emailForm.get('email')?.value; 
       this.isVerify=true;
       this.isFindByEmail=false;
       this.isFindByPhone=false;
       this.emailSend = this.emailForm.get('email')?.value;
       console.log("Verify",this.isVerify)
      },
      error: (err) => {console.log(err);
      }
    })

  }
  onSubmit2() {
    let params = new HttpParams();
  
    if(this.emailSend){
      params = params.append('userEmail', this.emailSend);
    }
  
    this.userService.sendOtp(params).subscribe({
      next: (res) => {console.log(res);
        
        this.isVerify=false;
        this.openSnackBar();
        setTimeout(() => {
          this.navigateTo("/");
        },1000);
        this.notifier.show({
          type: 'success',
          message: 'Send OTP to email succcess!',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
          this.navigateTo("/");
        },2000)
        
      },
      error: (err) => {console.log(err);
        this.notifier.show({
          type: 'error',
          message: 'Send OTP to email error, please check again',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
         
        },2000)
      }
    })
  }
  navigateTo(url: string) { 
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate([url]); 
      this.spinner.hide(); 
    }, 2000); 
  }
  openSnackBar() {
    this.snackBar.open("Send To Email Success","x", {
      duration: 3000,
    });
  }
}
