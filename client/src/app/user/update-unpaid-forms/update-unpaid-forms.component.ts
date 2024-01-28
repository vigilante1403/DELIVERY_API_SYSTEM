import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICountry, IDeliveryAgent, IDistrict, IOrderShow, IReturnParcel, IReturnPayInfoParcel, IService, ISubmitAddress, ISubmitListParcel, ISubmitOrder, IWard } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-update-unpaid-forms',
  templateUrl: './update-unpaid-forms.component.html',
  styleUrls: ['./update-unpaid-forms.component.scss']
})
export class UpdateUnpaidFormsComponent implements OnInit {
  value!:IReturnPayInfoParcel
  addressAgree:boolean=false;
  packageAgree:boolean=false;
  serviceAgree:boolean=false;
  currentService:string='';
  private readonly notifier: NotifierService
  constructor(private route: Router,private fb: FormBuilder,public deliveryService:DeliveryService,private service:MapService,private _notifier: NotifierService, private spinner: NgxSpinnerService) {
    console.log(this.route.getCurrentNavigation()?.extras.state?.['data'])
    const data = this.route.getCurrentNavigation()?.extras.state?.['data']
    if(data!=undefined){
      localStorage.setItem('data',data)
      this.value=JSON.parse(data)
      this.currentService=this.value.orderDTO.service
    }
    this.notifier=_notifier;
  }
  ConvertContactData(contactAddress:any):string{
    var json = JSON.parse(contactAddress);
    var name = json["FullName"]
    var address= json["Address"]
    var phone = json["PhoneNumber"]
    return name+', Address: '+address+', PhoneNumber: (+84)'+phone
  }
  ngOnInit(): void {
    if(localStorage.getItem('data')!=null){
      this.value=JSON.parse(localStorage.getItem('data')!)
    }
    
    this.initForm()
    this.service.fetchAllCountries().subscribe({
      next:(res)=>{console.log(res);this.storedCountries=res;},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllDistricts().subscribe({
      next:(res)=>{console.log(res);this.storedDistricts=res},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllWards().subscribe({
      next:(res)=>{console.log(res);this.storedWards=res},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllExpress().subscribe({
      next:(res)=>{console.log(res);this.storedExpress=res},
      error:(err)=>{console.log(err)}
    })
    var orderId=Number(this.value.orderId)
    var customerId=this.value.orderDTO.customerId
    this.deliveryService.checkout(customerId,orderId).subscribe({
      next:(res)=>{console.log(res);this.storedOrder=res;this.defaultChooseDelivery()},
      error:(err)=>{console.log(err)}
    })
    this.deliveryService.fetchAllDeliveryType().subscribe({
      next:(res)=>{this.deliveryService.services=res;console.log(res);this.storedServices=res},
      error:(err)=>console.log(err)
    })
    this.ordersForm = this.fb.group({
      // contactAddress: ['', Validators.required],
      deliveryTypeId: [this.selected, Validators.required],
      prePaid: [this.prePaid,Validators.required],
    });
  }
  changeAddress(){
    this.addressAgree=!this.addressAgree
  }
  changePackage(){
    if(this.currentService!='money order'){
      this.packageAgree=!this.packageAgree
    }
    
  }
  changeService(){
    this.serviceAgree=!this.serviceAgree

  }
  ///package
  fileForms: FormGroup[] = [];
  index:number=0;
  files:any[]=[]
  submitList:ISubmitListParcel=({list:this.files,orderId:0,customerId:''})

  
 
  resetIndexData(){
    var total = this.fileForms.length;
    for(var i=0;i<total;i++){
      this.fileForms[i].patchValue({i:i})
    }
    this.index=total-1
  }
  addFormDataEntry() {
    const formDataEntry = this.fb.group({
      i:this.index,
      file: [null, Validators.required],
      parcelName: ['',Validators.required],
      weight:[0,Validators.required],
      quantity:[1,Validators.required]

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
    
    this.files.push(formSubmission)

      }
      console.log(formData)
    }
    this.submitList=({list:this.files,orderId:Number(this.value.orderId)
  ,customerId:this.value.orderDTO.customerId})
  console.log(this.submitList.orderId)
  console.log(this.submitList.customerId)
  var orderId:number =Number(this.value.orderId)
  
  const formData = new FormData()

  this.files.forEach((formDataObject, index) => {
    for (const [key, value] of formDataObject.entries()) {
      // Append each key-value pair with a unique key (e.g., 'list[0].file', 'list[0].description', ...)
      formData.append(`list[${index}].${key}`, value);
    }
  });
  
  formData.append('orderId',this.value.orderId.toString())
  formData.append('customerId',this.value.orderDTO.customerId)
  this.total()
  var submitUnFinishedOrder=({
    OrderId:this.value.orderId,
    SubmitOrder:this.submitOrder,
    SubmitAddressNew:this.submitAdress
  })
  console.log(submitUnFinishedOrder)
  var newstring = JSON.stringify(submitUnFinishedOrder)
  console.log("New String: ", newstring.toString())
  formData.append('submit1',newstring.toString())
  console.log("Form data: ",formData);
  
  this.deliveryService.editUnfinishedOrder(formData).subscribe({
    next:(res)=>{console.log(res);
      this.notifier.show({
        type: 'success',
        message: 'Edit order success!',
        id: 'THAT_NOTIFICATION_ID', 
      });
      setTimeout(()=>{
        this.notifier.hide('THAT_NOTIFICATION_ID');
       this.navigateTo("/user/new-cart");
      },2000);
      },
    error:(err)=>{console.log(err)
      this.notifier.show({
        type: 'error',
        message: 'Edit order error, please check again',
        id: 'THAT_NOTIFICATION_ID', 
      });
      setTimeout(()=>{
        this.notifier.hide('THAT_NOTIFICATION_ID');
       
      },2000)}
  })
  }
  ///adress 
  storedCountries:ICountry[]=[]
  storedDistricts:IDistrict[]=[]
  storedWards:IWard[]=[]
  tempDistrict:IDistrict[]=[]
  tempWard:IWard[]=[]
  tempDistrict2:IDistrict[]=[]
  tempWard2:IWard[]=[]
  selectedCountry:number=0;
  selectedDistrict:number=0;
  selectedWard:number=0;
  selectedCountry2:number=0;
  selectedDistrict2:number=0;
  selectedWard2:number=0;
  addressForm!:FormGroup
  flag:boolean=false;
  storedExpress:IDeliveryAgent[]=[]
  chooseDelivery:string=''
  chooseDeliveryId:number=0;
  change:boolean=false;
  storedOrder:IOrderShow=({
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


 initForm(){
  this.addressForm=this.fb.group({
    name1:['',Validators.required],
    name2:['',Validators.required],
    address1:['',Validators.required],
    address2:['',Validators.required],
    phone1:['',Validators.required],
    phone2:['',Validators.required]
  })
 }
 getListDistrict(event:Event){
  this.tempDistrict=[]
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry=Number(id);
  this.tempDistrict=this.storedDistricts
  this.tempDistrict=this.tempDistrict.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 validateInfo(){
  this.flag=true;
  const nameRegex = /^[a-zA-Z\s]*$/;
  const phoneRegex = /^\d{10}$/;

  if(!nameRegex.test(this.addressForm.get('name1')?.value)||!nameRegex.test(this.addressForm.get('name2')?.value)){
    this.flag=false;
  }
  if(!phoneRegex.test(this.addressForm.get('phone1')?.value)||!phoneRegex.test(this.addressForm.get('phone2')?.value)){
    this.flag=false;
  }

  return this.flag
 }
 getListWard(event:Event){
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedDistrict=Number(id)
  this.tempWard=this.storedWards
  this.tempWard=this.tempWard.filter(e=>e.districtId==Number(id))
 }
 getChosenWard(event:Event){
  const id = (event.target as HTMLSelectElement).value
  this.selectedWard=Number(id);
 }
 getListDistrict2(event:Event){
  this.tempDistrict2=[]
  this.tempWard2=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry2=Number(id);
  this.tempDistrict2=this.storedDistricts
  this.tempDistrict2=this.tempDistrict2.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 getListWard2(event:Event){
  this.tempWard2=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedDistrict2=Number(id);
  this.tempWard2=this.storedWards
  this.tempWard2=this.tempWard2.filter(e=>e.districtId==Number(id))
 }
 getChosenWard2(event:Event){
  const id = (event.target as HTMLSelectElement).value
  this.selectedWard2=Number(id);
 }
    
    defaultChooseDelivery(){
      var agentId = this.storedOrder.deliveryAgentId!;
      this.chooseDeliveryId=agentId
      var temp = this.storedExpress
      this.chooseDelivery = temp.filter(d=>d.id==agentId)[0].agentName
    }
    changeDelivery(){
      this.change=true;
    }
    getAgentChanged(event:Event){
      const id =Number((event.target as HTMLSelectElement).value) 
      var temp = this.storedExpress
      this.chooseDeliveryId=id
      this.chooseDelivery=temp.filter(d=>d.id==id)[0].agentName
      
    }
    onSubmit2(){
      if(this.addressForm.invalid){
        console.log("Form invalid")
        return;
      }else{
        if(!this.validateInfo()){
          console.log("Address or phone number invalid")
          return;
        }
        if(this.selectedCountry==0||this.selectedDistrict==0||this.selectedWard==0||this.selectedCountry2==0||this.selectedDistrict2==0||this.selectedWard2==0){
          console.log("Form invalid")
          return;
        }else{
          var submitAddress=({
            LocationStartPlaceId:this.selectedCountry,
            LocationEndPlaceId:this.selectedCountry2,
            LocationStartDistrictId:this.selectedDistrict,
            LocationEndDistrictId:this.selectedDistrict2,
            LocationStartWardId:this.selectedWard,
            LocationEndWardId:this.selectedWard2,
            LocationStartStreet:this.addressForm.get('address1')?.value,
            LocationEndStreet:this.addressForm.get('address2')?.value,
            ContactName:this.addressForm.get('name2')?.value,
            ContactPhoneNumber:this.addressForm.get('phone2')?.value,
            SenderName:this.addressForm.get('name1')?.value,
            SenderPhoneNumber:this.addressForm.get('phone1')?.value,
            DeliveryAgentId:this.chooseDeliveryId
          })
          this.submitAdress=submitAddress
         
         
        }
      }
    }
  discard(){
    this.navigateTo('/user/new-cart');
  }
  ///service
  selectedError=''
  storedServices:IService[]=[]
  disable = true;
  selected:number=0;
  getPrepaidLimit(event:Event){
    this.selectedError=''
    const id = (event.target as HTMLSelectElement).value
    console.log('running funcs')
    this.selected=Number(id);
    var services = this.storedServices;
    var service = services.filter(x=>x.id==this.selected)[0]
    this.currentService=service.serviceName;
    if(this.currentService=='money order'){
      this.packageAgree=false
    }
    console.log(service)
    var prePaid = service.prePaid
    if(prePaid){
      this.disable=false;
    }else{
      this.disable=true
    }
  }
  prePaid:number=0;
  @ViewChild('paid') paid!:ElementRef;
  ordersForm!: FormGroup;
  updatePrePaid(){
    this.prePaid=this.paid.nativeElement.value
    this.ordersForm.patchValue({prePaid:this.prePaid})
    console.log("Prepaid la: ",this.prePaid)
    console.log(this.ordersForm.get('prePaid'))
  }
  //summary
  submitAdress!:any
  submitOrder!:any
  submitListParcel!:ISubmitListParcel
  total(){
    if(this.ordersForm.valid){
      var submit = ({ServiceId:this.selected,CustomerId:this.value.orderDTO.customerId,
      PrePaid:this.ordersForm.get('prePaid')?.value,OrderDate:new Date()})
      console.log(submit)
      this.submitOrder=submit
    }
    this.onSubmit2()
  }
  navigateTo(url: string) { 
    this.spinner.show();
    setTimeout(() => {
      this.route.navigate([url]); 
      this.spinner.hide(); 
    }, 2000); 
  }
}
