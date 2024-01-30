import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { env } from 'src/app/config/environment';
import { IPricePerDistance } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-price-per-distance',
  templateUrl: './price-per-distance.component.html',
  styleUrls: ['./price-per-distance.component.scss']
})
export class PricePerDistanceComponent implements OnInit {
  ngOnInit(): void {
    this.loadPPD();
  }

 constructor(private http: HttpClient) {
  
 }
  listPPD: IPricePerDistance[]=[];
  loadPPD(){
    this.http.get<IPricePerDistance[]>(env+"/service/pricePerDistance/all").subscribe({
      next: (res: IPricePerDistance[])=>{this.listPPD=res;
      console.log(this.listPPD);
      },
      error: (err)=>{console.log(err)}
      
    })
  }
}
