import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { env } from 'src/app/config/environment';
import { IToken } from 'src/app/interface/Password/IToken';

@Component({
  selector: 'app-verify-send-to',
  templateUrl: './verify-send-to.component.html',
  styleUrls: ['./verify-send-to.component.scss'],
})
export class VerifySendToComponent implements OnInit {
  insertCodeForm!: FormGroup;
  @Input() email: string = '';

  isInsertCode = true;
  isNewPassword = false;
  token: IToken = { token: '' };

  // CustomerEmail= this.email;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.insertCodeForm = this.fb.group({
      OTP: ['', Validators.required],
      CustomerEmail: [this.email, Validators.required],
    });

    console.log(this.email);
  }
  // onSubmit() {
  //   let params = new HttpParams();
  //   if(this.email){
  //     params = params.append('userEmail', this.email);
  //   }

  //   this.http.get(env + '/account/forgot-generate-otp', {params}).subscribe({
  //     next: (res) => {console.log(res);
  //       this.isInsertCode=true;
  //       this.isVerify=false
  //     },
  //     error: (err) => {console.log(err);
  //     }
  //   })
  // }
  onSubmit() {
    // let params = new HttpParams();
    // if(this.email){
    //   params = params.append('userEmail', this.email);
    // }
    console.log(this.insertCodeForm.value);

    this.http
      .post(env + '/account/verification-otp-f', this.insertCodeForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          // let params = new HttpParams();
          // if(this.email){
          //     params = params.append('userEmail', this.email);
          //   }

          // console.log('trc khi vao');

          // this.http.get<IToken>(env+ '/account/token', {params}).subscribe({
          //   next: (response: IToken) =>{
          //     console.log('da vao');

          //     console.log(response);

          //     this.token=response;

          this.isInsertCode = false;

          this.isNewPassword = true;
          //   },
          //   error: (err) =>{console.log(err);
          //   }
          // })
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
