import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICountry, IDistrict, IWard } from 'src/app/interface/delivery/IDelivery';
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
  closeForm: boolean=false;
  @Output() closeModal =new  EventEmitter<boolean>;
constructor(private service: MapService ){}
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
}
