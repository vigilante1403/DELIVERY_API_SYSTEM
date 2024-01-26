import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { DeliveryService } from '../service/delivery.service';
import { ICustomer } from '../interface/Account/IUser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  query: string = '';
  searchResults!:ICustomer;
  searchDone:boolean=false;
  searchFail:boolean=false;
  constructor(private searchService:DeliveryService,private router:Router) {}

  onSubmit(): void {
    this.searchService.getCustomerInfo(this.query).subscribe(
      (results) => {
        this.searchResults = results;
        this.searchDone=true
        this.searchFail=false;
      },
      (error) => {
        console.error('Error during search:', error);
        this.searchDone=false
        this.searchFail=true
      }
    );
  }
  proceedToUserDetail(email:any,customerId:any){
    const extras:NavigationExtras={state:{
      data:customerId
    }}
    var url = "/employee/customer/"+email+"/deliveries"
    this.router.navigate([url],extras)

  }
}
