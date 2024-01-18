import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { MapService } from 'src/app/service/map.service';
import { IDeliveryAgent } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-all-agents',
  templateUrl: './all-agents.component.html',
  styleUrls: ['./all-agents.component.scss']
})
export class AllAgentsComponent implements OnInit {
  storedExpress:IDeliveryAgent[]=[]
constructor(private service:MapService){

}
ngOnInit(): void {
    this.service.fetchAllExpress().subscribe({
      next:(res)=>{this.storedExpress=res},
      error:(err)=>{console.log(err)}
    })
}
}
