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
  storedUsers:IUser[]=[]
  admin:string='a'
  selected: boolean = false;
  selected2: boolean = false;
  keyword: string ="";
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
constructor(private service:ManageService){}
ngOnInit(): void {
   this.loadUser()
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
loadUser(){
  this.service.getAllUsers().subscribe({
    next:(res)=>{this.storedUsers=res;},
    error:(err)=>{console.log(err)}
  })
}

onSort() {
  this.selected =!this.selected;
  this.sortDisplayName();
}
onSortEmail() {
  this.selected2 =!this.selected2;
  this.sortEmail();
}

receiveKeyword(event: Event) {
  // Gán giá trị vào biến keyword
let target = event.target as HTMLInputElement;
  this.keyword = target.value;
  // Gọi hàm tìm kiếm dữ liệu
  this.searchData();
}
searchData() {
  // Lọc dữ liệu theo từ khóa
  this.storedUsers = this.storedUsers.filter(item => item.displayName.includes(this.keyword) || item.email.includes(this.keyword));

  if(this.keyword===''){
    this.loadUser();
  }
}
}
