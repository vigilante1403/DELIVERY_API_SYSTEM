
import { Component, AfterViewInit, ElementRef,NgZone, ViewChild, OnInit } from '@angular/core';
import { MapService } from 'src/app/service/map.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountry, IDistrict, ISubmitAddress, IWard } from 'src/app/interface/delivery/IDelivery';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'uuidv4';



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
  constructor(private fb:FormBuilder,private service:MapService,private routeActivate:ActivatedRoute) { }
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
    senderPhoneNumber:this.addressForm.get('phone1')?.value
          })
          var orderId = this.routeActivate.snapshot.paramMap.get('orderId')
          this.service.createNewOrderPayment(orderId,submitAddress).subscribe({
            next:(res)=>{console.log(res)},
            error:(err)=>{console.log(err)}
          })
        }
      }
    }

}

