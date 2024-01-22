import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AdminSidebarService } from 'src/app/admin-sidebar/admin-sidebar.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
faSearch=faSearch
options=["Users Management","Orders Management","Delivery Agents Management","Location Management","Order Payment Status Management","Order Status Management","Service Management"]
choose:string="Users Management"
switchTable(table:string){
  this.choose=table
}
constructor(public service:AdminSidebarService){}
ngOnInit(){
 
  
}

}
