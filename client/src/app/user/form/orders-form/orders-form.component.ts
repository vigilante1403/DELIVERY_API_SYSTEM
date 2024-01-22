import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';

import { IOrderShow, IService, ISubmitOrder } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { Route, Router } from '@angular/router';

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
  constructor(private formBuilder: FormBuilder,public service:DeliveryService,public checkout:CheckoutService,private router:Router) {}

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      // contactAddress: ['', Validators.required],
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
  showButton:string='Next Step'
  updatePrePaid(){
    this.prePaid=this.paid.nativeElement.value
    this.ordersForm.patchValue({prePaid:this.prePaid})
    console.log("Prepaid la: ",this.prePaid)
    console.log(this.ordersForm.get('prePaid'))
  }
  onSubmit() {
    if(this.selected==0){
      this.selectedError='Please choose a service!'
    }else{
      this.selectedError=''
    }
  //  this.validateContactAddress();
   if(this.error.length>0||this.selectedError.length>0){
    console.log('submit failed!')
   }else{
    if(this.ordersForm.valid){
      var submit:ISubmitOrder = ({serviceId:this.selected,customerId:this.service.customer.id,
      prePaid:this.ordersForm.get('prePaid')?.value,orderDate:new Date()})
      console.log(submit)
      this.service.addNewOrder(submit).subscribe({
        next:(res)=>{console.log(res),console.log('submit ok');this.afterClass1Finished()},
        error:(err)=>console.log(err)
      })
      this.showButton='Saving...'
      delay(1000)
      this.showButton='Next Step'
    }
   }
    // console.log(this.ordersForm.value);
  }
  Input:IOrderShow=({
    id:0,
    contactAddress:'',
    senderInfo:'',
    service:'',
    customerId:'',
    prePaid:0,
    orderDate:new Date(),
    orderStatus:'',
    orderPaymentId:0,
    deliveryAgentId:0,
    pricePerDistanceId:0
  })
  afterClass1Finished(){
    this.service.getLatestOrder(this.service.customer.id).subscribe({
      next:(res)=>{this.Input=res;this.isClass1=false;this.isClass2=true;this.showClass2=true;if(res.service!='money order'){
        this.allowPackage=true;
      }},
      error:(err)=>{console.log(err)}
    })
  }
  moveNextForm(){
    
      this.showClass2=false;
      this.isClass3=true
    
  }
  receiveDataFromChild(data:any){
    if(data==="close form 2"){
      this.showClass2=false;
      this.isClass3=true
    }
  }
  receiveFromAddressChild(data:any){
    this.closeForm=data
    this.getOrder(this.Input.customerId,this.Input.id);
  }
  navigateCheckoutPage(){
    var url ="/user/order/cart/"+this.Input.customerId+"/"+this.Input.id+"/checkout"
    this.router.navigateByUrl(url);
  }
  returnOrderPage(){
    this.router.navigateByUrl("/user/new-cart")
  }
  getOrder(customerId:any,orderId:any){
    this.checkout.fetchOrder(customerId,orderId)
  }
  allowPackage:boolean=false;
  showClass2:boolean=false;
  isClass1:boolean=true;
  isClass2:boolean=false;
  isClass3:boolean=false;
  closeForm:boolean=false;
}
