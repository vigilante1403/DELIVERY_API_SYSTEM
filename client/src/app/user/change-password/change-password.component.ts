import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { env } from 'src/app/config/environment';
import { IChangePassword } from 'src/app/interface/Password/IChangePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup
  showPassword = false;
  faEye=faEye; faEyeSlash = faEyeSlash;
  showConfirmPassword = false;
  newpassword: IChangePassword={email: "", oldPassword:'',newPassWord: '',}
  showOldPassword= false;
  constructor(private fb: FormBuilder,private http: HttpClient){
    
  }
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      email:[localStorage.getItem('userEmail'),Validators.required],
      oldPassword:['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
     
      
    }
    , {
      validator: this.matchPassword as ValidatorFn
    }as AbstractControlOptions);

    
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  matchPassword(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
      // return { passwordsNotMatch: true };
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
      // return null;
    }
  }
  onSubmit(){
console.log(this.changePasswordForm.get('email')?.value);
console.log(this.changePasswordForm.get('oldPassword')?.value);
console.log(this.changePasswordForm.get('newPassword')?.value);
    this.newpassword.email = localStorage.getItem('userEmail');

    this.newpassword.oldPassword = this.changePasswordForm.get('oldPassword')?.value;
    this.newpassword.newPassWord = this.changePasswordForm.get('newPassword')?.value;
    console.log(this.newpassword);
    console.log(this.changePasswordForm.value);
    
    
    this.http.post(env + '/account/3/r/change-password', this.newpassword).subscribe({
      next: (res) =>{console.log(res);
      },
      error: (err) =>{console.log(err);}
    })

  }
}
