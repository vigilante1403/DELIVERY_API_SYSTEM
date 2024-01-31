import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManageService } from '../manage/manage.service';
import { IUser } from 'src/app/interface/delivery/IDelivery';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ICustomer,ICustomer2,IUser as User } from 'src/app/interface/account/IUser';
import { env } from 'src/app/config/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryService } from 'src/app/service/delivery.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-make-role',
  templateUrl: './make-role.component.html',
  styleUrls: ['./make-role.component.scss']
})
export class MakeRoleComponent implements OnInit{
  storedUsers:IUser[]=[];
  customerlist: ICustomer=({id:"",name:'',phoneNumber:'',email:''});
  cus2:ICustomer2=({id:"",name:"",phoneNumber:"",email:'',imageUrl:''});
  backupStoredUsers:IUser[]=[];
  userList: User[]= [];
  userInfo:User=({userId:"",displayName:"",phoneNumber:"",email:"",imageUrl:'',token:"",role:''})
  admin:string='a'
  employee:string='e';
  users:string='u';
  selected: boolean = false;
  selected2: boolean = false;
  selected3: boolean = false;
  keyword: string ="";
  selectedRole: string=''
  faChevronDown= faChevronDown; faChevronUp= faChevronUp;
  modalRef?: BsModalRef;
  selectedChangeRole: string="";
  private readonly notifier: NotifierService
constructor(private modalService: BsModalService,private service:ManageService, private http: HttpClient,public deliveryService:DeliveryService,private _notifier: NotifierService,private router: Router,private spinner: NgxSpinnerService){
  this.notifier=_notifier;
}
ngOnInit(): void {
   this.loadUser();
  
}
loadUser(){
  this.service.getAllUsers().subscribe({
    next:(res)=>{this.storedUsers=res;
      this.backupStoredUsers=[...res];
      let temp= this.backupStoredUsers;
      temp=temp.filter(u => u.roleName!=="admin");
      this.storedUsers = temp;
    },
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
        this.editRole(this.backupStoredUsers,this.customerlist);
      },
      error: (err)=>{ console.log(err);
      }
    })
  }
 

  openModal(template: TemplateRef<void>,email:string){
    this.modalRef = this.modalService.show(template);
    this.fetchAllCustomerDetail(email);   
  }
  editRole(user:IUser[],res2: ICustomer){
    this.http.get<ICustomer2>(env+'/Authorize/profile/1/'+res2.email).subscribe({
      next: (res:ICustomer2) => {
        this.cus2=res
        var i=user.find(i => i.email==res2.email );      
          var newUser: User=({
           userId:i!.id,
           role:i!.roleName,
           phoneNumber:res2.phoneNumber,
           email:i!.email,
           displayName:i!.displayName,
           imageUrl:res.imageUrl,
           token:''
          })
          this.userInfo = newUser;
          console.log(this.userInfo.role);
          console.log(this.userInfo);
      },
      error: (err) => {console.log(err)}
     }) 
  }
  getChangeRoleChoose(event:Event){
  const val = (event.target as HTMLSelectElement).value
  this.selectedChangeRole=val;
  console.log(this.selectedChangeRole);
  
}
  onChangeRole(){
    console.log(this.userInfo.role);
    console.log(this.selectedChangeRole);
    
    if(this.selectedChangeRole===this.userInfo.role|| this.selectedChangeRole==""){
      console.log("role cu roi");
      this.modalRef?.hide();
      this.notifier.show({
        type: 'info',
        message: 'No Change Role!',
        id: 'THAT_NOTIFICATION_ID', 
      });
      setTimeout(()=>{
        this.notifier.hide('THAT_NOTIFICATION_ID');
 
      },2000)
      return
    }
    const change ={
      email: this.userInfo.email,
      role: this.selectedChangeRole
    }
    this.http.post(env+ '/Admin/change-user-role', change).subscribe({
      next: (res)=> {console.log(res);
        console.log("change thanh cong");
       
        this.notifier.show({
          type: 'success',
          message: 'Change Role Succcess!',
          id: 'THAT_NOTIFICATION_ID', 
        });
        this.spinner.show();
        setTimeout(() => {
          this.loadUser();
          this.modalRef?.hide();
          this.spinner.hide();
          setTimeout(()=>{
            this.notifier.hide('THAT_NOTIFICATION_ID');           
          },1000) 
        }, 2000);
       
        
      },
      error: (err)=> {console.log(err);
        this.notifier.show({
          type: 'error',
          message: 'Change Role Error!',
          id: 'THAT_NOTIFICATION_ID', 
        });
        setTimeout(()=>{
          this.notifier.hide('THAT_NOTIFICATION_ID');
          
        },2000)}
    })
  }
  navigateTo(url: string) { 
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate([url]); 
      this.spinner.hide(); 
    }, 2000); 
  }
}
