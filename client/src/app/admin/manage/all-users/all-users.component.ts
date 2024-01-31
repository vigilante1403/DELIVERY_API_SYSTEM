import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManageService } from '../manage.service';
import { IUser } from '../../../interface/delivery/IDelivery';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from 'src/app/interface/account/IUser';
import { env } from 'src/app/config/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  storedUsers:IUser[]=[];
  customerlist: ICustomer=({id:"",name:'',phoneNumber:'',email:''});
  backupStoredUsers:IUser[]=[];
  admin:string='a';
  employee:string='e';
  users:string='u';
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  keyword: string ="";
  selectedRole: string=''
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
  modalRef?: BsModalRef;
constructor(private modalService: BsModalService,private service:ManageService, private http: HttpClient,public deliveryService:DeliveryService){}
ngOnInit(): void {
   this.loadUser();
}
loadUser(){
  this.service.getAllUsers().subscribe({
    next:(res)=>{this.storedUsers=res;this.backupStoredUsers=[...res]},
    error:(err)=>{console.log(err)}
  })
}
getRoleChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedRole=val;
}
sortDisplayName() {
  if(this.selected == true) {
    this.storedUsers.sort((a,b) => a.displayName.localeCompare(b.displayName));
  } else {
    this.storedUsers.sort((a,b) => b.displayName.localeCompare(a.displayName));
  }

}
sortEmail() {
  if(this.selected2 == true) {
    this.storedUsers.sort((a,b) => a.email.localeCompare(b.email));
  } else {
    this.storedUsers.sort((a,b) => b.email.localeCompare(a.email));
  }

}
sortRole() {
  if(this.selected3 == true) {
    this.storedUsers.sort((a,b) => a.roleName.localeCompare(b.roleName));
  } else {
    this.storedUsers.sort((a,b) => b.roleName.localeCompare(a.roleName));
  }

}

onSortDisplayname() {
  this.selected =!this.selected;
  this.sortDisplayName();
}
onSortEmail() {
  this.selected2 =!this.selected2;
  this.sortEmail();
}
onSortRole() {
  this.selected3 =!this.selected3;
  this.sortRole();
}

receiveKeyword(event: Event) {
 
let target = event.target as HTMLInputElement;
  this.keyword = target.value;
 
}
searchButton(){
  var temp=this.backupStoredUsers;
  
  if(this.selectedRole!='-1'){
    temp=temp.filter(x=>x.roleName?.includes(this.selectedRole))
  }
  if(this.keyword!=""){
    if(this.keyword.includes("@")){
      temp=temp.filter(x=>x.email.includes(this.keyword));
    }else{
      temp=temp.filter(x=>x.id.includes(this.keyword)||x.displayName.includes(this.keyword))
    }
    
  }
  this.storedUsers=temp;
}
@ViewChild('search') search!:ElementRef

  refreshButton(){
    this.storedUsers=this.backupStoredUsers
    this.search.nativeElement.value=""
  }
  fetchAllCustomerDetail(email:string){
    this.deliveryService.getCustomerInfo(email).subscribe({
      next: (res:ICustomer) =>{console.log(res);
        this.customerlist=res;
      },
      error: (err)=>{ console.log(err);
      }
    })
  }
  openModal(template: TemplateRef<void>,email:string){
    this.modalRef = this.modalService.show(template);
    this.fetchAllCustomerDetail(email)
    
  }
}
