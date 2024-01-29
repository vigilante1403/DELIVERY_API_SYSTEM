import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IService } from '../interface/delivery/IDelivery';
import { env } from '../config/environment';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit{
  services: IService[]=[];
  constructor(private http: HttpClient){}
  ngOnInit(): void {
      this.loadService();
  }
  loadService(){
    this.http.get<IService[]>(env+ "/service/all").subscribe({
      next: (res: IService[])=>{
        console.log(res);
        this.services=res;
      },
      error: (err)=>{console.log(err);
      }
    })
  }
}
