import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faE, faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { env } from 'src/app/config/environment';
import { ISubmitChangePassword } from 'src/app/interface/Password/ISubmitChangePassord';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm!: FormGroup;
  showPassword = false;
  faEye=faEye; faEyeSlash = faEyeSlash;
  showConfirmPassword = false;
  @Input()
  token!: string;
  newpassword: ISubmitChangePassword={newPassword:''}

  constructor(private router: Router,private fb: FormBuilder,private http: HttpClient, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
   
  }
  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      token: [this.token]
    
    }
    , {
      validator: this.matchPassword as ValidatorFn
    }as AbstractControlOptions);
    console.log('bbbb');
    
    console.log(this.token);
    
  }
  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('newpassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
      // return { passwordsNotMatch: true };
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
      // return null;
    }
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  onSubmit(){

    this.newpassword.newPassword= this.newPasswordForm.get('newpassword')?.value;
    this.http.post(env + '/account/3/r/reset-password/' + this.newPasswordForm.get('token')?.value, this.newpassword).subscribe({
      next: (res) => {console.log("thanh cong");
      this.openSnackBar();
      setTimeout(()=>{
        this.navigateTo("/");
      },1000)
      
      },
      error: (err) => {console.log(err);
      }
    })
    
    console.log(this.newPasswordForm.get('newpassword')?.value);
    
  }
  navigateTo(url: string) { 
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate([url]); 
      this.spinner.hide(); 
    }, 2000); 
  }
  openSnackBar() {
    this.snackBar.open("Change Password Success","x", {
      duration: 3000,
    });
  }
}
 