import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/interface/delivery/IDelivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  storedServices:IService[]=[];
  backupStoredServices:IService[]=[];
  keyword:string='';
  selected: boolean = false;
  selected2: boolean = false;
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
  constructor(private service:DeliveryService){}
  ngOnInit(): void {
      this.service.fetchAllDeliveryType().subscribe({
        next:(res)=>{this.storedServices=res;this.backupStoredServices=[...res]},
        error:(err)=>{console.log(err)}
      })
  }
  receiveKeyword(event: Event) {
 
    let target = event.target as HTMLInputElement;
      this.keyword = target.value;
     
      this.searchData();
    }
    searchData() {
     
      this.storedServices = this.storedServices.filter(item => item.serviceName.includes(this.keyword));
    
      if(this.keyword===''){
        this.storedServices=this.backupStoredServices;
      }
    }

    sortServiceName() {
      if(this.selected == true) {
        this.storedServices.sort((a,b) => a.serviceName.localeCompare(b.serviceName));
      } else {
        this.storedServices.sort((a,b) => b.serviceName.localeCompare(a.serviceName));
      }
    
    }
    sortPrice() {
      if(this.selected2 == true) {
        this.storedServices.sort((a,b) => a.price - (b.price));
      } else {
        this.storedServices.sort((a,b) => b.price - (a.price));
      }
    
    }
   
    
    onSortServiceName() {
      this.selected =!this.selected;
      this.sortServiceName();
    }
    onSortPrice(){
      this.selected2=!this.selected2;
      this.sortPrice();
    }
    
}
