import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { env } from 'src/app/config/environment';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  editProfileForm!: FormGroup;
  userEmail= localStorage.getItem('userEmail');
  imageUrl= localStorage.getItem('imageUrl');
  
  constructor(private fb: FormBuilder,private service:MapService){}
  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      DisplayName: ['', Validators.required],
      Email: [this.userEmail, Validators.required],
      // ImageUrl: [this.imageUrl, Validators.required],
      ImageUrl: [null,Validators.required]
    })
  }
  onFileSelected(event:any) {


    const file:File = event.target?.files[0]

    if (file) {
        this.editProfileForm.patchValue({ImageUrl:file})
        console.log(event.target.files[0])
        
    }
}
  onSubmit(){
    if(this.editProfileForm.valid){
      const user = {
        displayname: this.editProfileForm.get('Displayname')?.value,
        email: this.editProfileForm.get('Email')?.value,
        imageUrl: this.editProfileForm.get('ImageUrl')?.value
      }
      console.log(user.imageUrl);
      const formData = new FormData()
      formData.append('displayName',user.displayname)
      formData.append('email',user.email)
      formData.append('imageUrl',user.imageUrl)
      this.service.editProfileBasic(formData).subscribe({
        next:(res)=>{console.log(res)},
        error:(err)=>{console.log(err)}
      })

     
    }
   
    
  }
}
