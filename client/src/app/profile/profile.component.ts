import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../service/delivery.service';
import { ModalService } from '../nav-bar/modal/modal.service';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
change:boolean=false;
tempImage=''
constructor(private service:DeliveryService,public modal:ModalService,private mapService:MapService){
console.log(modal.user);
}
file1!:File
ngOnInit(): void {
    this.service.getCustomerInfo(localStorage.getItem('userEmail'));
}
onFileSelected(event:any){
  const file:File = event.target?.files[0]

  if (file) {
    this.change=true
      this.file1=file
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.tempImage = e.target.result;
    };

    reader.readAsDataURL(file);
      
  }
}
onSaveChanges(){
  const formData = new FormData();
  formData.append('imageUrl',this.file1,this.file1.name)
  formData.append('email',this.modal.user.email)
this.mapService.editAvatarOnly(formData).subscribe({
  next:(res)=>{localStorage.setItem('imageUrl',res.imageUrl);this.modal.user.imageUrl=res.imageUrl},
  error:(err)=>{console.log(err)}
})
}
}
