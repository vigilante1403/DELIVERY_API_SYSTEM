import { Component, Input } from '@angular/core';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-edit-afterwards-image',
  templateUrl: './edit-afterwards-image.component.html',
  styleUrls: ['./edit-afterwards-image.component.scss']
})
export class EditAfterwardsImageComponent {
 tempImage =""
 change=false;
 file1!:File
 @Input() orderId!:number
 constructor(private service:DeliveryService) {
  
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
  formData.append('orderId',this.orderId.toString())
this.service.updateReceiveImage(formData).subscribe({
  next:(res)=>{console.log("Update success");},
  error:(err)=>{console.log(err)}
})
}
}
