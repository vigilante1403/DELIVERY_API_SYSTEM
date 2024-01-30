import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { env } from 'src/app/config/environment';
import { IDeliveryAgent } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-delivery-agent-page',
  templateUrl: './delivery-agent-page.component.html',
  styleUrls: ['./delivery-agent-page.component.scss']
})
export class DeliveryAgentPageComponent implements OnInit {
  agents: IDeliveryAgent[] = [];
  constructor(private http: HttpClient) {
    
  }
  ngOnInit(): void {
    this.loadDeliveryAgent();
  }
  loadDeliveryAgent(){
    this.http.get<IDeliveryAgent[]>(env+ '/delivery/delivery-agent').subscribe({
      next:(res:IDeliveryAgent[])=>{
        this.agents = res;
      },
      error:(err)=>{console.log(err);
      }
    })
  }

}
