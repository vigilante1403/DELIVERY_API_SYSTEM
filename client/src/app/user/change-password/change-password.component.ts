import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
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
  validate = false;
  @Output() dataToParent  = new EventEmitter<boolean>
  closeForm =false
  private readonly notifier: NotifierService
  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router,private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private _notifier: NotifierService){
    this.notifier=_notifier
  }
  ngOnInit(): void {
   
    this.changePasswordForm = this.fb.group({
      email:[localStorage.getItem('userEmail')],
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
    if (confirmPassword == '') {
      formGroup.get('confirmPassword')?.setErrors({ required: true });
    }else if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } 
    else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  get f(){
    return this.changePasswordForm.controls;
  }
  onSubmit(){
    this.validate = true;
    if(this.changePasswordForm.invalid){
     return;
    }
    this.newpassword.email = localStorage.getItem('userEmail');

    this.newpassword.oldPassword = this.changePasswordForm.get('oldPassword')?.value;
    this.newpassword.newPassWord = this.changePasswordForm.get('newPassword')?.value;
    
    this.http.post(env + '/account/3/r/change-password', this.newpassword).subscribe({
      next: (res) =>{console.log(res);
        this.notifier.show({
          type: 'success',
          message: 'Change Password Success',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
          this.sendData();
          this.navigateTo("/user");
        },2000)
      },
      error: (err) =>{console.log(err);
        this.notifier.show({
          type: 'error',
          message: 'An error occurred, please check again',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
         
        },2000)
      }
    })
    // this.openSnackBar();
    // setTimeout(() => {
    //   this.navigateTo("/user");
    // }, 1000)
    
    
   
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
  sendData(){
    this.dataToParent.emit(this.closeForm);
  }
}
