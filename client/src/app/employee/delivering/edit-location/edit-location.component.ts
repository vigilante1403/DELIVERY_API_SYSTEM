import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICountry, IDistrict, ISubmitChangeLocation, IWard } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit{
  storedCountries:ICountry[]=[]
storedDistricts:IDistrict[]=[]
storedWards:IWard[]=[]
tempDistrict:IDistrict[]=[]
  tempWard:IWard[]=[]
  selectedCountry:number=0;
  selectedDistrict:number=0;
  selectedWard:number=0;
  closeForm: boolean=false;
  @Output() closeModal =new  EventEmitter<boolean>;
  @Input() orderId!:number
constructor(private service: MapService,private deliverySerivce:DeliveryService ){}
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

onCloseModal(){
  this.closeModal.emit(this.closeForm)
}
getListDistrict(event:Event){
  this.tempDistrict=[]
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedCountry=Number(id);
  this.tempDistrict=this.storedDistricts
  this.tempDistrict=this.tempDistrict.filter(e=>e.allPlacesInCountryId==Number(id))
  
 }
 getListWard(event:Event){
  this.tempWard=[]
  const id = (event.target as HTMLSelectElement).value
  this.selectedDistrict=Number(id)
  this.tempWard=this.storedWards
  this.tempWard=this.tempWard.filter(e=>e.districtId==Number(id))
 }
 updateLocation(){
  if(this.selectedWard==-1){
    console.log("invalid")
  }else{
    var temp = this.storedWards
    var zipcode = temp.filter(d=>d.id==this.selectedWard)[0].zipCode!
    var submit:ISubmitChangeLocation=({
      orderId:this.orderId,
      newZipCodeLocation:zipcode
    })
    this.deliverySerivce.updateLocation(submit).subscribe({
      next:(res)=>{console.log(res);this.onCloseModal()},
      error:(err)=>{console.log(err)}
    })
  }
 }
}
