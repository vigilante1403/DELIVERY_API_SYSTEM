import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IOrderStatus } from 'src/app/interface/delivery/IDelivery';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  storedStatus:IOrderStatus[]=[];
  backupStoredStatus:IOrderStatus[]=[];
  selected: boolean = false;
 
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
constructor(private service:ManageService){}
ngOnInit(): void {
   this.loadOrderStatus();
}

loadOrderStatus(){
  this.service.getAllOrderStatus().subscribe({
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
