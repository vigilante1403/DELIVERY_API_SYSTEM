import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ISubmitListParcel, ISubmitParcel } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-new-package-form',
  templateUrl: './new-package-form.component.html',
  styleUrls: ['./new-package-form.component.scss']
})
export class NewPackageFormComponent {
  @Input() orderIdMain!:string
  @Input() customerIdMain!:string
  fileForms: FormGroup[] = [];
  index:number=0;
  files:any[]=[]
  submitList:ISubmitListParcel=({list:this.files,orderId:0,customerId:''})
  private readonly notifier: NotifierService;
  constructor(private formBuilder: FormBuilder,private routeActivate:ActivatedRoute,private service:DeliveryService, private _notifier:NotifierService) {
    // this.addFormDataEntry();
   this.notifier=_notifier;
  }
  ngOnInit(): void {

  }
  resetIndexData(){
    var total = this.fileForms.length;
    for(var i=0;i<total;i++){
      this.fileForms[i].patchValue({i:i})
    }
    this.index=total-1
  }
  addFormDataEntry() {
    const formDataEntry = this.formBuilder.group({
      i:this.index,
      file: [null, Validators.required],
      parcelName: ['',Validators.required],
      weight:[0,Validators.required],
      quantity:[1,Validators.required],
      amount:[0,Validators.required]

    });
 
      this.fileForms.push(formDataEntry);
     
      this.index=this.index+1
      console.log('index hien tai: '+this.index)
      for(var part of this.fileForms){
        console.log(part)
      }
  }

  removeFormDataEntry(index: number) {
    
      console.log("remove data has index: "+index)
    this.fileForms.splice(index, 1);
    this.resetIndexData()
    
    
  }
  onFileSelected(event:any,index:any) {


    const file:File = event.target?.files[0]

    if (file) {
        this.fileForms[index].patchValue({file:file})
        console.log(event.target.files[0])
        
    }
}
  onSubmit() {
    for (const formData of this.fileForms) {
      const fileValue = formData.get('file')?.value;
      if(formData.pristine){
        continue;
      }
      if (!fileValue) {
        console.log('No file selected for an entry');
        // continue;
      }else{
        const formSubmission = new FormData()
    //     var submitParcel:ISubmitParcel=({id:formData.get('i')?.value,parcelName:formData.get('parcelName')?.value,
    // weight:formData.get('weight')?.value,image:formData.get('file')?.value})
   console.log(formData.get('file')?.value)
    formSubmission.append('image',formData.get('file')?.value)
    formSubmission.append('id',formData.get('i')?.value)
    formSubmission.append('parcelName',formData.get('parcelName')?.value)
    formSubmission.append('weight',formData.get('weight')?.value)
    formSubmission.append('quantity',formData.get('quantity')?.value)
    formSubmission.append('amountAssume',formData.get('amount')?.value)
    
    this.files.push(formSubmission)

      }
      console.log(formData)
    }
    this.submitList=({list:this.files,orderId:Number(this.orderIdMain)
  ,customerId:this.customerIdMain})
  console.log(this.submitList.orderId)
  console.log(this.submitList.customerId)
  var orderId:number =Number(this.orderIdMain)
  
  const formData = new FormData()

  this.files.forEach((formDataObject, index) => {
    for (const [key, value] of formDataObject.entries()) {
      // Append each key-value pair with a unique key (e.g., 'list[0].file', 'list[0].description', ...)
      formData.append(`list[${index}].${key}`, value);
    }
  });
  // formData.append('list',JSON.stringify(this.files))
  formData.append('orderId',this.orderIdMain)
  formData.append('customerId',this.customerIdMain)

    this.service.addPackageToOrder(formData).subscribe({
      next:(res)=>{console.log(res);this.sendData()
        this.notifier.show({
          type: 'success',
          message: 'Success!',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
        },2000)
      },
      error:(err)=>{
        console.log(err);
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

  }
  @Output() dataToParent=new EventEmitter<string>
  sendData(){
    this.dataToParent.emit('close form 2')
  }
}
