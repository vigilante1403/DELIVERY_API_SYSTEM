import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { env } from 'src/app/config/environment';
import { IToken } from 'src/app/interface/Password/IToken';

@Component({
  selector: 'app-verify-send-to',
  templateUrl: './verify-send-to.component.html',
  styleUrls: ['./verify-send-to.component.scss'],
})
export class VerifySendToComponent implements OnInit {
  insertCodeForm!: FormGroup;
 

  isInsertCode = true;
  isNewPassword = false;
  token: IToken = { token: '' };
  email: string ='';
  private readonly notifier: NotifierService

  constructor(private fb: FormBuilder, private http: HttpClient, private activatedRoute: ActivatedRoute, private _notifier: NotifierService) {
    this.notifier=_notifier
  }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    this.token.token=token;
    this.email = JSON.parse(atob(token.split('.')[1])).email;
    this.insertCodeForm = this.fb.group({
      OTP: ['', Validators.required],
      CustomerEmail: [this.email, Validators.required],
      Authentication:[token]
    });
    

  }

  onSubmit() {

    console.log(this.insertCodeForm.value);

    this.http
      .post(env + '/account/verification-otp-f', this.insertCodeForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          setTimeout(()=> {
            this.notifier.show({
              type: 'success',
              message: 'Send OTP to email succcess!',
              id: 'THAT_NOTIFICATION_ID', 
            });
            this.isInsertCode = false;

            this.isNewPassword = true;
            setTimeout(()=>{
              this.notifier.hide('THAT_NOTIFICATION_ID');
              
            },2000)
           
          },2000)

         

        },
        error: (err) => {
          console.log(err);
          this.notifier.show({
            type: 'error',
            message: 'Verification OTP Error!',
            id: 'THAT_NOTIFICATION_ID', 
          });
         
          setTimeout(()=>{
            this.notifier.hide('THAT_NOTIFICATION_ID');
            
          },2000)
        },
      });
  }
}
