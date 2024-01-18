import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
faSearch=faSearch
options=["Users Management","Orders Management","Delivery Agents Management","Location Management","Order Payment Status Management","Order Status Management","Service Management"]
choose:string="Users Management"
switchTable(table:string){
  this.choose=table
}
}
