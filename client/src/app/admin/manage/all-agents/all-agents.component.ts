import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManageService } from '../manage.service';
import { MapService } from 'src/app/service/map.service';
import { IDeliveryAgent } from 'src/app/interface/delivery/IDelivery';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-agents',
  templateUrl: './all-agents.component.html',
  styleUrls: ['./all-agents.component.scss']
})
export class AllAgentsComponent implements OnInit {
  storedExpress:IDeliveryAgent[]=[];
  backupStoredExpress: IDeliveryAgent[]=[];
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  selected4: boolean = false;
  selected5: boolean = false;
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
  selectedStartAt: string='';
  selectedEndAt: string='';
constructor(private service:MapService){

}
ngOnInit(): void {
   this.loadExpress();
}

loadExpress(){
  this.service.fetchAllExpress().subscribe({
    next:(res)=>{this.storedExpress=res;this.backupStoredExpress=[...res];
    console.log(this.storedExpress);
    },
    error:(err)=>{console.log(err)}
  })
}

  sortAgentName() {
    if(this.selected == true) {
      this.storedExpress.sort((a,b) => a.agentName.localeCompare(b.agentName));
    } else {
      this.storedExpress.sort((a,b) => b.agentName.localeCompare(a.agentName));
    }
  
  }
  sortAgentContact() {
    if(this.selected2 == true) {
      this.storedExpress.sort((a,b) => a.agentContactNumber.localeCompare(b.agentContactNumber));
    } else {
      this.storedExpress.sort((a,b) => b.agentContactNumber.localeCompare(a.agentContactNumber));
    }
  
  }
  sortVehicle() {
    if(this.selected3 == true) {
      this.storedExpress.sort((a,b) => a.vehicleNumber.localeCompare(b.vehicleNumber));
    } else {
      this.storedExpress.sort((a,b) => b.vehicleNumber.localeCompare(a.vehicleNumber));
    }
  
  }

    
  onSortAgentName() {
    this.selected =!this.selected;
    this.sortAgentName();
  }
  onSortAgentContact() {
    this.selected2 =!this.selected2;
    this.sortAgentContact();
  }
  onSortVehicle() {
    this.selected3 =!this.selected3;
    this.sortVehicle();
  }
  sortStartAt() {
    if(this.selected4 == true) {
      this.storedExpress.sort((a,b) => a.startWorkingTime!.localeCompare(b.startWorkingTime!));
    } else {
      this.storedExpress.sort((a,b) => b.startWorkingTime!.localeCompare(a.startWorkingTime!));
    }
  
  }

    
  onSortStartAt() {
    this.selected4 =!this.selected4;
    this.sortStartAt();
  }
  sortEndAt() {
    if(this.selected5 == true) {
      this.storedExpress.sort((a,b) => a.endWorkingTime!.localeCompare(b.endWorkingTime!));
    } else {
      this.storedExpress.sort((a,b) => b.endWorkingTime!.localeCompare(a.endWorkingTime!));
    }
  
  }

    
  onSortEndAt() {
    this.selected5 =!this.selected5;
    this.sortEndAt();
  }
  getStartAtChoose(event:Event){
    const val = (event.target as HTMLSelectElement).value
    this.selectedStartAt=val; 
  }
  getEndAtChoose(event:Event){
    const val = (event.target as HTMLSelectElement).value
    this.selectedEndAt=val;    
  }
  receiveKeyword(event: Event) {
 
    let target = event.target as HTMLInputElement;
      this.keyword = target.value;
     
      
    }
  
    searchButton(){
      var temp=this.backupStoredExpress;
      
      
      if(this.selectedStartAt!='-1' && this.selectedStartAt!='0'){
        temp=temp.filter(x=>x.startWorkingTime?.includes(this.selectedStartAt))
      }
      if(this.selectedStartAt==='0'){
        temp=temp.filter(x=>x.startWorkingTime ==='')
       
      }
      if(this.selectedEndAt!='-1' && this.selectedEndAt!='0'){
        temp=temp.filter(x=>x.endWorkingTime?.includes(this.selectedEndAt))
      }
      if(this.selectedEndAt==='0'){
        temp=temp.filter(x=>x.endWorkingTime === '');
      }
      
      if(this.keyword!=""){
      
          temp=temp.filter(x=>x.vehicleNumber.includes(this.keyword)||x.agentName.includes(this.keyword)||x.agentContactNumber.includes(this.keyword))
 
      }
      this.storedExpress=temp;
    }
    @ViewChild('search') search!:ElementRef
    
      refreshButton(){
        this.storedExpress=this.backupStoredExpress;
        this.search.nativeElement.value=""
      }
      
}
