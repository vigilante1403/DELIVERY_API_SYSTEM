import { Component, OnInit } from '@angular/core';
import { IPaymentStatus } from 'src/app/interface/delivery/IDelivery';
import { MapService } from 'src/app/service/map.service';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  storedStatus:IPaymentStatus[]=[];
  backupStoredStatus:IPaymentStatus[]=[];
  selected: boolean = false;
 
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
constructor(private service:MapService){}
ngOnInit(): void {
   this.loadOrderPaymentStatus();
}

loadOrderPaymentStatus(){
  this.service.fetchAllOrderPaymentStatus().subscribe({
    next:(res)=>{this.storedStatus=res;this.backupStoredStatus=[...res]},
    error:(err)=>{console.log(err)}
  })
}
receiveKeyword(event: Event) {
 
  let target = event.target as HTMLInputElement;
    this.keyword = target.value;
   
    this.searchData();
  }
  searchData() {
   
    this.storedStatus = this.storedStatus.filter(item => item.statusName.includes(this.keyword));
  
    if(this.keyword===''){
      this.storedStatus=this.backupStoredStatus;
    }
  }

  sortStatus() {
    if(this.selected == true) {
      this.storedStatus.sort((a,b) => a.statusName.localeCompare(b.statusName));
    } else {
      this.storedStatus.sort((a,b) => b.statusName.localeCompare(a.statusName));
    }
  
  }
  
  onSortStatus() {
    this.selected =!this.selected;
    this.sortStatus();
  }
}
