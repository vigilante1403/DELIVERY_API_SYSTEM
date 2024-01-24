import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICountry, IDistrict, IWard } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';
import { ManageService } from '../../../manage.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
storedCountries:ICountry[]=[]
storedDistricts:IDistrict[]=[]
storedWards:IWard[]=[]
tempDistrict:IDistrict[]=[]
selectedCountry:number=0
allowDistrictAdd:boolean=false;
allowWardAdd:boolean=false
selectedDistrict:number=0
tempWard:IWard[]=[]
districtName:string=''
wardName:string=''
wardCode:number=0
constructor(private service:MapService,
  private manage:ManageService){

}
ngOnInit(): void {
    this.service.fetchAllCountries().subscribe({
      next:(res)=>{this.storedCountries=res},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllDistricts().subscribe({
      next:(res)=>{this.storedDistricts=res},
      error:(err)=>{console.log(err)}
    })
    this.service.fetchAllWards().subscribe({
      next:(res)=>{this.storedWards=res},
      error:(err)=>{console.log(err)}
    })
}
getListDistrict(event:Event){
  this.tempDistrict=[]
  this.tempWard=[]
  if(this.selectedDistrict==0){
    this.allowDistrictAdd=true;
  }else{
    this.allowDistrictAdd=false;
  }
  
  this.allowWardAdd=false;
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry=Number(id);
  this.tempDistrict=this.storedDistricts
  this.tempDistrict=this.tempDistrict.filter(e=>e.allPlacesInCountryId==Number(id))
 }
 getDistrictOptions(event:Event){
  const id = (event.target as HTMLSelectElement).value
  this.allowWardAdd=false;
    if(Number(id)==0){
      this.allowDistrictAdd=true;
      this.selectedDistrict=0;
      this.tempWard=[]
    }else{
      this.allowDistrictAdd=false;
      this.selectedDistrict=Number(id)
      this.tempWard=this.storedWards
    this.tempWard=this.tempWard.filter(e=>e.districtId==Number(id))
    }
 }
 getWardOptions(event:Event){
  const id = (event.target as HTMLSelectElement).value
    if(Number(id)==0){
      this.allowWardAdd=true;
    }else{
      this.allowWardAdd=false;
    }
 }
 addNewDistrict(){
  if(this.districtName.length==0){
    console.log("Invalid name");
    return;
  }
  var district=({
    name:this.districtName,
    allPlacesInCountryId:this.selectedCountry
  })
  this.manage.addNewDistrict(district).subscribe({
    next:(res)=>{console.log("ok");this.updateDistrict()},
    error:(err)=>{console.log(err)}
  })
 }
 addNewWard(){
  if(this.wardName.length==0){
    console.log("Invalid ward name");
    return;
  }
  var ward=({
    name:this.wardName,
    districtId:this.selectedDistrict,
    zipCode:this.wardCode
  })
  this.manage.addNewWard(ward).subscribe({
    next:(res)=>{console.log("ok");this.updateWard()},
    error:(err)=>{console.log(err)}
  })
 }
 updateDistrict(){
  this.service.fetchAllDistricts().subscribe({
    next:(res)=>{this.storedDistricts=res;this.tempDistrict=res.filter(w=>w.allPlacesInCountryId===this.selectedCountry)},
    error:(err)=>{console.log(err)}
  })
 }
 updateWard(){
  this.service.fetchAllWards().subscribe({
    next:(res)=>{this.storedWards=res;this.tempWard=res.filter(w=>w.districtId===this.selectedDistrict)},
    error:(err)=>{console.log(err)}
  })
 }
}
