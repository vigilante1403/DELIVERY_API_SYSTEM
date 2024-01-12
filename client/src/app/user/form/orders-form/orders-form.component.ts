import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IService, ISubmitOrder } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {
  @ViewChild('paid') paid!:ElementRef;
  ordersForm!: FormGroup;
  selected:number=0;
  storedServices:IService[]=[]
  disable = true;
  error:string=''
  contact:string=''
  prePaid:number=0;
  selectedError:string=''
  constructor(private formBuilder: FormBuilder,public service:DeliveryService) {}

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      contactAddress: ['', Validators.required],
      deliveryTypeId: [this.selected, Validators.required],
      prePaid: [this.prePaid,Validators.required],
    });
    this.service.getCustomerInfo(localStorage.getItem('userEmail')).subscribe({
      next:(res)=>{console.log(res);this.service.customer=res},
      error:(err)=>console.log(err)
    })
    this.service.fetchAllDeliveryType().subscribe({
      next:(res)=>{this.service.services=res;console.log(res);this.storedServices=res},
      error:(err)=>console.log(err)
    })
    console.log(localStorage.getItem('userEmail'))
    
  }
  getPrepaidLimit(event:Event){
    this.selectedError=''
    const id = (event.target as HTMLSelectElement).value
    console.log('running funcs')
    this.selected=Number(id);
    var services = this.storedServices;
    var service = services.filter(x=>x.id==this.selected)[0]
    console.log(service)
    var prePaid = service.prePaid
    if(prePaid){
      this.disable=false;
    }else{
      this.disable=true
    }
  }
  validateContactAddress(){
    var infos =[]
    this.contact=''
    var contactAddress:string = this.ordersForm.get('contactAddress')?.value
   const parts = contactAddress.split('-')
   for(let part of parts){
    infos.push(part)
    console.log(part)
   }
   if(infos.length!=3){
    this.error='Invalid contact address. Please use correct above format! '
   }else{
    this.error=''
   }
   const addressRegex = /^[\s\S]*$/;
   const phoneRegex = /^\d{10}$/;
   const nameRegex = /^[a-zA-Z\s]*$/;
   var name = nameRegex.test(infos[0]);
   var address = addressRegex.test(infos[1])
   var phone = phoneRegex.test(infos[2])
   if(!name||!address||!phone){
    this.error = "Wrong type of given contact information, please try again! example nguyen van a - Duong so 1 - 0909*****"
   }else{
    this.error=''
    var obj = {"name":infos[0],"address":infos[1],"phoneNumber":infos[2]}
    var jsonstring=JSON.stringify(obj);
    this.contact=jsonstring
   }
   
 
  }
  updatePrePaid(){
    this.prePaid=this.paid.nativeElement.value
  }
  onSubmit() {
    if(this.selected==0){
      this.selectedError='Please choose a service!'
    }else{
      this.selectedError=''
    }
   this.validateContactAddress();
   if(this.error.length>0||this.selectedError.length>0){
    console.log('submit failed!')
   }else{
    if(this.ordersForm.valid){
      var submit:ISubmitOrder = ({contactAddress:this.contact,serviceId:this.selected,customerId:this.service.customer.id,
      prePaid:this.ordersForm.get('prePaid')?.value,orderDate:new Date()})
      console.log(submit)
      this.service.addNewOrder(submit).subscribe({
        next:(res)=>{console.log(res),console.log('submit ok')},
        error:(err)=>console.log(err)
      })
    }
   }
    // console.log(this.ordersForm.value);
  }
}
