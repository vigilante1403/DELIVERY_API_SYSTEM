import { Component, OnInit } from '@angular/core';
import { ModalService } from './nav-bar/modal/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SidebarService } from './sidebar/sidebar.service';
import { Router } from '@angular/router';
import { PeriodService } from './period/period.service';
import { NotifierService } from 'angular-notifier';
import { BackgroundService } from './background/background.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private interval:any
  formattedDate:string=''
  constructor(private datepipe:DatePipe,private background:BackgroundService,private modalService:ModalService,public sidebarservice:SidebarService,private router:Router,private dataService:PeriodService){
    
  }
  title = 'client';
  

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }
  isAdminRoute():boolean{
    return this.router.url.startsWith('/admin')
  }
  isEmployeeRoute():boolean{
    return this.router.url.startsWith('/employee')
  }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  

  

  ngOnInit(): void {
    
  
   
    }
      ngAfterViewInit(){
        if(this.modalService.user.token!=''){
          this.background.fetchCustomerTodayEvent(this.modalService.user.userId!)
        }
        if(this.background.userEvent.length>0){
          console.log("Running")
          
          setInterval(()=>{
            var date = new Date()
          this.formattedDate=this.datepipe.transform(date,'yyyy-MM-dd HH:mm')!
           if(this.background.userEvent.length>0){
             this.background.userEvent.forEach(el=>{
               var pickUp=this.datepipe.transform(new Date(el.pickUpDateTime),'yyyy-MM-dd HH:mm')!
               var deliver = this.datepipe.transform(new Date(el.deliveryDate),'yyyy-MM-dd HH:mm')!
               if(pickUp==this.formattedDate){
                 this.background.makeNotif(this.formattedDate)
               } else if(deliver==this.formattedDate){
                 this.background.makeNotif(this.formattedDate)
               }
             })
            }
          },25000)
          this.interval=()=>{
            if(this.modalService.user.token!=''){
              console.log("Running background")
              this.background.makeNotif(this.formattedDate)
            }
          }
          setInterval(this.interval,60000)
        }else{
          console.log("Empty delivery check")
        }
      }
}
  

