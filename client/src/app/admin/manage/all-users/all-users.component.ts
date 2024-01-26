import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IUser } from 'src/app/interface/delivery/IDelivery';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  storedUsers:IUser[]=[];
  backupStoredUsers:IUser[]=[];
  admin:string='a'
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
constructor(private service:ManageService){}
ngOnInit(): void {
   this.loadUser()
}
loadUser(){
  this.service.getAllUsers().subscribe({
    next:(res)=>{this.storedUsers=res;this.backupStoredUsers=[...res]},
    error:(err)=>{console.log(err)}
  })
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
 
  this.searchData();
}
searchData() {
 
  this.storedUsers = this.storedUsers.filter(item => item.displayName.includes(this.keyword) || item.email.includes(this.keyword));

  if(this.keyword===''){
    this.storedUsers=this.backupStoredUsers;
  }
}
}
