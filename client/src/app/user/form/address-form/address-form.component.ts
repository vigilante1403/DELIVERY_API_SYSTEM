
import { Component, AfterViewInit, ElementRef,NgZone, ViewChild, OnInit } from '@angular/core';
import { MapService } from 'src/app/service/map.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountry, IDeliveryAgent, IDistrict, IOrderShow, ISubmitAddress, IWard } from 'src/app/interface/delivery/IDelivery';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from 'src/app/service/delivery.service';
import { NotifierService } from 'angular-notifier';




declare var google: any;
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

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
  private readonly notifier : NotifierService
  constructor(private fb:FormBuilder,private service:MapService,private routeActivate:ActivatedRoute,private deliveryService:DeliveryService, private _notifier: NotifierService) {
    this.notifier=_notifier
   }
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
    ngOnInit() {

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
        var orderId=Number(this.routeActivate.snapshot.paramMap.get('orderId'))
        var customerId=this.routeActivate.snapshot.paramMap.get('customerId')
        this.deliveryService.checkout(customerId,orderId).subscribe({
          next:(res)=>{console.log(res);this.storedOrder=res;this.defaultChooseDelivery()},
          error:(err)=>{console.log(err)}
        })
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
    onSubmit(){
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
          var submitAddress:ISubmitAddress=({
            locationStartPlaceId:this.selectedCountry,
    locationEndPlaceId:this.selectedCountry2,
    locationStartDistrictId:this.selectedDistrict,
    locationEndDistrictId:this.selectedDistrict2,
    locationStartWardId:this.selectedWard,
    locationEndWardId:this.selectedWard2,
    locationStartStreet:this.addressForm.get('address1')?.value,
    locationEndStreet:this.addressForm.get('address2')?.value,
    contactName:this.addressForm.get('name2')?.value,
    contactPhoneNumber:this.addressForm.get('phone2')?.value,
    senderName:this.addressForm.get('name1')?.value,
    senderPhoneNumber:this.addressForm.get('phone1')?.value,
    deliveryAgentId:this.chooseDeliveryId
          })
          var orderId = this.routeActivate.snapshot.paramMap.get('orderId')
          this.service.createNewOrderPayment(orderId,submitAddress).subscribe({
            next:(res)=>{console.log(res)
              this.notifier.show({
                type: 'success',
                message: 'Success!',
                id: 'THAT_NOTIFICATION_ID', 
              });
              setTimeout(()=>{
                this.notifier.hide('THAT_NOTIFICATION_ID');
              },2000)},
            error:(err)=>{console.log(err)
              this.notifier.show({
                type: 'error',
                message: 'An error occurred, please check again',
                id: 'THAT_NOTIFICATION_ID', 
              });
              setTimeout(()=>{
                this.notifier.hide('THAT_NOTIFICATION_ID');
              },2000)}
          })
        }
      }
    }

}

