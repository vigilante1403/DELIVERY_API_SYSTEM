import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { env } from 'src/app/config/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  editProfileForm!: FormGroup;
  userEmail= localStorage.getItem('userEmail');
  imageUrl= localStorage.getItem('imageUrl');
  
  constructor(private fb: FormBuilder, private http: HttpClient){}
  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      DisplayName: ['', Validators.required],
      Email: [this.userEmail, Validators.required],
      ImageUrl: [this.imageUrl, Validators.required],
      ImageUrl2: ['']
    })
  }

  onSubmit(){
    if(this.editProfileForm.valid){
      const user = {
        displayname: this.editProfileForm.get('Displayname')?.value,
        email: this.editProfileForm.get('Email')?.value,
        imageUrl: this.editProfileForm.get('ImageUrl2')?.value=='' ? this.editProfileForm.get('ImageUrl')?.value : this.editProfileForm.get('ImageUrl2')?.value,
      }
      console.log(user.imageUrl);

      // post request to API //

      // this.http.post(env + '/account/edit-profile', user).subscribe({
      //   next: (res) => {console.log(res);
      //   },
      //   error: (err) => {}
      // })
    }
   
    
  }
}
